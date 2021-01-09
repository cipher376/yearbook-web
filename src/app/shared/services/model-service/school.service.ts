import { MySignals } from './../my-signals';
import { UtilityService } from './../providers/utility.service';
import { Address } from './../../../models/address';
import { School, SchoolInterface, SchoolDetailsInterface } from './../../../models/school';
import { PageInfo, getPagedData } from '../../../models/page';
import { Router } from '@angular/router';
import { API_ROOT_URL, CREST_DEFAULT_PHOTO_URL, DOWNLOAD_CONTAINER, NO_SCHOOL_COVER_PHOTO_URL, SCHOOL_DEFAULT_PHOTO_URL } from '../../config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IdentityPhoto, Photo } from 'src/app/models/my-media';
import { MyStorage } from '../providers/my-storage.service';

export interface Token {
  token: '';
}



@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private store: MyStorage,
    private signals: MySignals) {

  }


  static getSchoolIdentityPhoto(school: School) {
    const photo: IdentityPhoto = {} as any;
    school?.photos?.forEach(ph => {
      if (ph.profile) {
        ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileUrl ?? SCHOOL_DEFAULT_PHOTO_URL;
        photo.profile = ph;
      }
      if (ph.coverImage) {
        ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileUrl ?? NO_SCHOOL_COVER_PHOTO_URL;
        ph.fileUrl = DOWNLOAD_CONTAINER + ph.thumbnailUrl ?? NO_SCHOOL_COVER_PHOTO_URL;
        photo.cover = ph;
      }

      if (ph.flag) {
        ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileUrl ?? CREST_DEFAULT_PHOTO_URL;
        photo.flag = ph;
      }
    });

    if (school?.photos?.length < 1) {
      photo.profile = new Photo();
      photo.profile.fileUrl = SCHOOL_DEFAULT_PHOTO_URL;
      photo.profile.thumbnailUrl = SCHOOL_DEFAULT_PHOTO_URL;

      photo.cover = new Photo();
      photo.cover.fileUrl = NO_SCHOOL_COVER_PHOTO_URL;
      photo.cover.thumbnailUrl = NO_SCHOOL_COVER_PHOTO_URL;

      photo.flag = new Photo();
      photo.flag.fileUrl = CREST_DEFAULT_PHOTO_URL;
      photo.flag.thumbnailUrl = CREST_DEFAULT_PHOTO_URL;
    }
    return photo;
  }

  static getSchoolProfilePhotoUrl(identityPhoto: IdentityPhoto) {
    return identityPhoto?.profile?.thumbnailUrl ||
      identityPhoto?.flag?.thumbnailUrl || CREST_DEFAULT_PHOTO_URL;
  }

  static getSchoolCoverPhotoUrl(identityPhoto: IdentityPhoto) {
    return identityPhoto?.cover?.thumbnailUrl || NO_SCHOOL_COVER_PHOTO_URL;
  }

  createUpdateSchool(school: SchoolInterface): Observable<SchoolInterface> {
    if (school.id) { // perform update
      return this.http.patch<SchoolInterface>('/schools', school).pipe(
        map(res => {
          // console.log(res);
          return school as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<SchoolInterface>('/schools', school).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  createUpdateSchoolDetails(schoolId: number, details: SchoolDetailsInterface): Observable<SchoolDetailsInterface> {
    if (details.id) { // perform update
      return this.http.patch<SchoolInterface>(`/schools/${schoolId}/school-details`, details).pipe(
        map(res => {
          // console.log(res);
          return details as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<SchoolInterface>(`/schools/${schoolId}/school-details`, details).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  createUpdateSchoolAddress(schoolId: number, address: Address): Observable<Address> {
    if (address.id) { // perform update
      return this.http.patch<SchoolInterface>(`/schools/${schoolId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return address as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<SchoolInterface>(`/schools/${schoolId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getSchools(pageInfo?: PageInfo, filter: any = {
    include: [{
      relation: 'address',
    },
    {
      relation: 'schoolDetails'
    }]
  }): Observable<School[]> {
    if (pageInfo) {
      filter = {
        offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit,
        // skip: pageInfo.count
        include: [{
          relation: 'address',
        },
        {
          relation: 'schoolDetails'
        }]
      };
    }
    filter = filter ? 'filter=' + JSON.stringify(filter) : '';
    const url = '/schools?' + filter;
    // // console.log(url);
    return this.http.get<School[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  searchSchool(searchKey = 'all', pageInfo?: PageInfo): Observable<School[]> {
    let filter = {};
    if (pageInfo) {
      filter = {
        offset: pageInfo.offset,
        limit: pageInfo.limit,
      };
    }
    if (!searchKey) {
      searchKey = 'all';
    }
    const url = '/schools-search/' + searchKey + '?filter=' + JSON.stringify(filter) ?? '';
    console.log(url);
    return this.http.get<School[]>(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getSchoolDetails(schoolId: any) {
    const filter = {
      include: [
        // { relation: 'photos' },
        { relation: 'address' },
        { relation: 'schoolConfig' },
        { relation: 'post' },
        {
          relation: 'alumni',
          scope: {
            include: [
              {
                relation: 'school',
                scope: {
                  include: [
                    { relation: 'photos' }]
                }
              }
            ]
          }
        }
      ]
    };
    const url = `/schools/${schoolId}?filter=` + JSON.stringify(filter);
    return this.http.get<School[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }
  countSchools(): Observable<number> {
    return this.http.get<School[]>('/schools/count').pipe(
      map(res => {
        if (res) {
          this.signals.announceSchoolsCount((res as any).count);
          return (res as any).count;

        }
        return 0;
      }),
      catchError(e => this.handleError(e))
    );
  }


  deleteSchool(schoolId: number) {
    return this.http.delete<SchoolInterface>(`/schools/${schoolId}/school-details`).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  getUserSchools(userId: any): Observable<School[]> {
    const filter = {
      include: [
        { relation: 'address' },
        { relation: 'schoolDetails' },
        { relation: 'photos' }
      ]
    } as any;

    // console.log(filter);
    const url = `/users/${userId}/schools?filter=` + JSON.stringify(filter);
    return this.http.get<School[]>(url).pipe(
      map(res => {
        // console.log(res);
        return SchoolService.flattenSchools(res) as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  /////////////////////////////////////////////////////////////////////////
  /*************Local school access*****/
  ///////////////////////////////////////////////////////////////////////////



  // Read school object from sesson storage
  async getSchoolLocal(): Promise<School> {
    return this.store.getObject('selectedSchool');
  }
  async setSchoolLocal(school: School) {
    this.signals.announceSchool(school);
    return this.store.setObject('selectedSchool', school);
  }

  async deleteSchoolLocal() {
    this.signals.announceSchool(null);
    this.store.remove('selectedSchool');
  }


  ////////////////////////////////////////////////////////////
  /**********************Helper function ******************* */
  ////////////////////////////////////////////////////////////

  static flattenSchools(schools: any[]) {
    const returnSchools: School[] = [];
    schools.forEach(school => {
      returnSchools.push(new School(school, school?.schoolDetails));
    });
    // console.log(returnSchools);
    return returnSchools;
  }

  static flattenSchool(school: any) {
    return new School(school, school?.schoolDetails);
  }



  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'school'));
  }
}
