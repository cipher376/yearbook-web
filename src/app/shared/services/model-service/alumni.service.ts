import { MySignals } from './../my-signals';
import { AlumniInterface } from './../../../models/alumni';
import { Degree } from './../../../models/degree';
import { UtilityService } from './../providers/utility.service';
import { PageInfo, getPagedData } from '../../../models/page';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Alumni } from '../../../models/alumni';
import { MyStorage } from '../providers/my-storage.service';



@Injectable({
  providedIn: 'root',
})
export class AlumniService {


  constructor(
    private http: HttpClient,
    private store: MyStorage,
    private signals: MySignals
    ) {

  }

  createOrUpdateAlumni(alumni: AlumniInterface) {
    if (alumni.id) { // perform update
      return this.http.patch<Alumni>(`/alumni/${alumni.id}`, alumni).pipe(
        map(res => {
          // console.log(res);
          return alumni as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Alumni>(`/alumni/`, alumni).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getAlumni(pageInfo?: PageInfo, userId?: number, schoolId?: number): Observable<Alumni[]> {
    const filter = {
      order: 'id DESC',
      include: [
        { relation: 'user' },
        {
          relation: 'school',
          scope: {
            include: [
              { relation: 'address' },
              { relation: 'schoolDetails' },
              { relation: 'photos' }
            ]
          }
        },
        { relation: 'degree' },
        // { relation: 'post' }
      ]
    } as any;
    if (pageInfo) {
      filter.offset = pageInfo.offset * pageInfo.limit;
      filter.limit = pageInfo.limit;
    }
    filter.where = {};
    if (schoolId) {
      filter.where.schoolId = schoolId;
    }

    if (userId) {
      filter.where.userId = userId;
    }
    // console.log(filter);
    const url = `/alumni?filter=` + JSON.stringify(filter);
    return this.http.get<Alumni[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUserAlumni(userId: any, schoolId?: any): Observable<Alumni[]> {
    const filter = {
      order: 'id DESC',
      include: [
        { relation: 'degree' },
        {
          relation: 'school',
          scope: {
            include: [
              { relation: 'address' },
              { relation: 'schoolDetails' },
              { relation: 'photos' }]
          }
        }
        // { relation: 'post' }
      ],
      where: {
        userId
      }
    } as any;

    if (schoolId) {
      filter.where.schoolId = schoolId;
    }

    // console.log(filter);
    const url = `/alumni?filter=` + JSON.stringify(filter);
    return this.http.get<Alumni[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );

  }

  isUserAlumni(userId: any, schoolId: any): Observable<Alumni> {
    const filter = {
      where: {
        and: [{ userId }, { schoolId }]
      }
    } as any;
    // console.log(filter);
    const url = `/alumni?filter=` + JSON.stringify(filter);
    return this.http.get<Alumni[]>(url).pipe(
      map(res => {
        console.log(res);
        if (res?.length > 0) {
          return res[0] as any;
        } else {
          return null;
        }
      }),
      catchError(e => this.handleError(e))
    );
  }

  getSchoolAlumni(schoolId: any, pageInfo?: PageInfo): Observable<Alumni[]> {
    const filter = {
      order: 'id DESC',
      where: {
        schoolId
      },
      include: [
        { relation: 'degree' },
        {
          relation: 'user',
          scope: {
            include: [
              { relation: 'photos' },
              { relation: 'address' },
            ]
          }
        }
      ]
    } as any;

    if (pageInfo) {
      filter.limit = pageInfo?.limit;
      filter.offset = pageInfo?.offset;
    }
    // console.log(filter);
    const url = `/alumni?filter=` + JSON.stringify(filter);
    // console.log(url);
    return this.http.get<Alumni[]>(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  getAlumniByIds(ids: string[], pageInfo?: PageInfo): Observable<Alumni[]> {
    let filter;
    if (pageInfo) {
      filter = {
        order: 'id DESC',
        offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit,
        where: {
          id: { inq: ids }
        },
      };
    }
    const url = '/alumni?filter=' + JSON.stringify(filter);
    return this.http.get<Alumni[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getAlumniById(alumniId: number) {
    const filter = {
      // include: [
      //   { relation: 'photos' },
      //   { relation: 'address' },
      //   { relation: 'alumniConfig' },
      //   { relation: 'post' },
      //   {
      //     relation: 'alumni',
      //     scope: {
      //       include: [
      //         {
      //           relation: 'school',
      //           scope: {
      //             include: [
      //               { relation: 'photos' }]
      //           }
      //         }
      //       ]
      //     }
      //   }
      // ]
    };
    const url = `/alumni/${alumniId}?filter=` + JSON.stringify(filter);
    return this.http.get<Alumni[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  countAlumni(schoolId?: number): Observable<number> {
    let filter = {} as any;

    if (schoolId) {
      filter = {
        schoolId
      };
    }
    return this.http.get<any>('/alumni/count?where=' + JSON.stringify(filter)).pipe(
      map(res => {
        if (res) {
          this.signals.announceSelectedSchoolAlumniCount((res as any).count);
          return (res as any).count;
        }
        return 0;
      }),
      catchError(e => this.handleError(e))
    );
  }


  deleteAlumniById(alumnusId?: number): Observable<any> {
    return this.http.delete<Alumni>('/alumni/' + alumnusId).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteAlumni(userId: number, schoolId: number): Observable<any> {
    return this.http.delete<Alumni>(`/alumni/delete/${userId}/${schoolId}`).pipe(
      map(res => {
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Local alumni access*****/
  ///////////////////////////////////////////////////////////////////////////

  createOrUpdateDegree(alumniId: number, degree: Degree) {
    if (degree.id) { // perform update
      return this.http.patch<Degree>(`/alumni/${alumniId}/degree`, degree).pipe(
        map(res => {
          // console.log(res);
          return degree as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Degree>(`/alumni/${alumniId}/degree`, degree).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }


  /////////////////////////////////////////////////////////////////////////
  /*************Local alumni access*****/
  ///////////////////////////////////////////////////////////////////////////



  // Read alumni object from sesson storage
  async getAlumniLocal(): Promise<Alumni> {
    return (await this.store.getObject('alumni'));
  }

  deleteAlumniLocal() {
    this.store.remove('alumni');
  }




  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'alumni'));
  }
}
