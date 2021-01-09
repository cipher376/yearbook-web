import { PushTopic } from '../../../models/push-topic';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "src/app/models/post";
import { MySignals } from "../my-signals";
import { UtilityService } from '../providers/utility.service';
import { MyStorage } from '../providers/my-storage.service';

@Injectable({
    providedIn: 'root',
})
export class PushMessageService {

    constructor(
        private http: HttpClient,
        private store: MyStorage,
        private signals: MySignals
    ) {

    }

    createTopic(topic: PushTopic): Observable<Post> {
        return this.http.post<PushTopic>(`/topics/`, topic).pipe(
            map(res => {
                // console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }


    private handleError(e: any): any {
        // console.log(e);
        return throwError(UtilityService.myHttpErrorFormat(e, 'alumni'));
    }

}
