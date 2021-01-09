import { Follow } from './../../../models/follow';
import { PageInfo } from 'src/app/models/page';
import { Comment } from './../../../models/comment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Like } from 'src/app/models/like';
import { UtilityService } from '../providers/utility.service';
import { School } from 'src/app/models/school';
import { SchoolService } from './school.service';
import { User } from 'src/app/models/user';
import { MyStorage } from '../providers/my-storage.service';

@Injectable({
    providedIn: 'root',
})
export class SocialService {
    redirectUrl = '';

    constructor(
        private http: HttpClient,
        private store: MyStorage
    ) {

    }

    likeOrDislike(rate: Like): Observable<Like> {
        console.log(rate);

        if (rate.id) { // perform update
            return this.http.patch<Like>(`/likes/${rate.id}`, rate).pipe(
                map(res => {
                    // console.log(res);
                    return res as any;
                }),
                catchError(e => this.handleError(e))
            );
        } else {
            return this.http.post<Like>('/likes/', rate).pipe(
                map(res => {
                    // console.log(res);
                    return res as any;
                }),
                catchError(e => this.handleError(e))
            );
        }
    }

    //     like(rate: Like): Observable<Like> {
    //         return this.http.post<Like>('/likes/', rate).pipe(
    //             map(res => {
    //                 // console.log(res);
    //                 return res as any;
    //             }),
    //             catchError(e => this.handleError(e))
    //         );
    // }

    // dislike(rate: Like) {
    //     if (rate.id && rate.rate) {
    //         return;
    //     }
    //     return this.http.patch<Like>(`/likes/${rate.id}`, rate).pipe(
    //         map(res => {
    //             // console.log(res);
    //             return res as any;
    //         }),
    //         catchError(e => this.handleError(e))
    //     );
    // }

    getLikeById(id: any) {
        return this.http.get<Like>(`/likes/${id}`).pipe(
            map(res => {
                console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    getLike(initiatorId: any, receiverId: any) {
        let filter: any = {
            where: {
                initiatorId,
                receiverId
            }
        };
        filter = 'filter=' + JSON.stringify(filter);
        const url = '/likes?' + filter;
        // console.log(initiatorId);
        return this.http.get<Like>(url).pipe(
            map(res => {
                // console.log(res);
                const aff = res ? res[0] : null;
                return aff;
            }),
            catchError(e => this.handleError(e))
        );
    }

    countLikes(receiverId: any, receiverName: string) {
        receiverName = receiverName.toLowerCase();
        let filter: any = {
            where: {
                receiverId,
                receiverName
            }
        };
        filter = 'filter=' + JSON.stringify(filter);
        const url = '/likes/count?' + filter;
        return this.http.get<Like>(url).pipe(
            map(res => {
                // console.log(res);
                // const aff = res ? res[0] : null;
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    getLikes(receiverId: any, receiverName?: string) {
        let filter: any = {
            where: {
                receiverId,
                receiverName
            }
        };
        filter = 'filter=' + JSON.stringify(filter);
        const url = '/likes?' + filter;
        return this.http.get<Like>(url).pipe(
            map(res => {
                // console.log(res);
                // const aff = res ? res[0] : null;
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }


    getPostLikes(receiverId: any): Observable<Like[]> {
        return this.getLikes(receiverId, 'post');
    }


    private handleError(e: any): any {
        // console.log(e);
        return throwError(UtilityService.myHttpErrorFormat(e, 'Social'));
    }


    createUpdateComment(comment: Comment): Observable<Comment> {
        if (!(comment.initiatorId && comment.postId)) {
            // console.log(comment);
            console.log('Invalid Post or Creator Id ');
            return;
        }

        if (comment.id) { // perform update
            return this.http.patch<Comment>(`/comments/${comment.id}`, comment).pipe(
                map(res => {
                    // console.log(res);
                    return res as any;
                }),
                catchError(e => this.handleError(e))
            );
        } else {
            return this.http.post<Comment>('/comments/', comment).pipe(
                map(res => {
                    // console.log(res);
                    return res as any;
                }),
                catchError(e => this.handleError(e))
            );
        }
    }

    getPostComments(postId, pageInfo?: PageInfo): Observable<Comment[]> {
        let filter: any = {
            order: 'id DESC',
            limit: pageInfo?.limit,
        };
        filter = `?filter=${JSON.stringify(filter)}`;
        return this.http.get<Comment>(`/posts/${postId}/comments${filter}`).pipe(
            map(res => {
                // console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    countPostComments(postId): Observable<number> {
        return this.http.get<Comment>(`/posts/${postId}/comments/count`).pipe(
            map(res => {
                return (res as any);
            }),
            catchError(e => this.handleError(e))
        );
    }


    followOrUnfollow(follow: Follow): Observable<Follow> {
        console.log(follow);

        if (follow.id) { // perform update
            return this.http.patch<Follow>(`/follows/${follow.id}`, follow).pipe(
                map(res => {
                    console.log(res);
                    return follow as any;
                }),
                catchError(e => this.handleError(e))
            );
        } else {
            return this.http.post<Follow>('/follows/', follow).pipe(
                map(res => {
                    console.log(res);
                    return res as any;
                }),
                catchError(e => this.handleError(e))
            );
        }
    }


    getFollow(leaderId: any, followerId?: string) {
        let filter: any = {
            where: {
                leaderId
            }
        };
        if (followerId) {
            filter.where.followerId = followerId;
        }
        // console.log(filter);
        filter = 'filter=' + JSON.stringify(filter);
        const url = '/follows?' + filter;
        return this.http.get<Follow[]>(url).pipe(
            map(res => {
                // console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    deleteFollow(followId: any) {
        return this.http.delete(`/follows/${followId}`).pipe(
            map(res => {
                console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    getSchoolFollowers(schoolId: any, pageInfo?: PageInfo, filter?: any) {
        if (!filter) {
            filter = {
                order: 'id DESC',
                include: [
                    {
                        relation: 'photos',
                        scope: {
                            where: { or: [{ coverImage: true }, { profile: true }, { flat: true }] }
                        }
                    },
                    { relation: 'address' },
                ]
            };
        }
        if (pageInfo) {
            filter.limit = pageInfo?.limit;
            filter.offset = pageInfo?.offset;
        }
        const url = `/schools/${schoolId}/followers?filter=` + JSON.stringify(filter);
        return this.http.get<User[]>(url).pipe(
            map(res => {
                console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    countSchoolFollower(schoolId: any, where?: any) {
        const filter = where ? `?where=` + JSON.stringify(where) : '';
        const url = `/schools/${schoolId}/followers/count` + filter;
        return this.http.get<number>(url).pipe(
            map(res => {
                console.log(res);
                return res as any;
            }),
            catchError(e => this.handleError(e))
        );
    }

    getUserFollowedSchools(userId: any, pageInfo?: PageInfo): Observable<School[]> {
        let filter = {
            order: 'id DESC',
            include: [
                { relation: 'address' },
                { relation: 'schoolDetails' },
                {
                    relation: 'photos',
                    scope: {
                        where: { or: [{ coverImage: true }, { profile: true }, { flat: true }] }
                    }
                }
            ]
        } as any;

        if (pageInfo) {
            filter.offset = pageInfo.offset;
            filter.limit = pageInfo.limit;
        }
        // console.log(filter);
        const url = `/users/${userId}/followed-schools?filter=` + JSON.stringify(filter);
        return this.http.get<School[]>(url).pipe(
            map(res => {
                // console.log(res);
                return SchoolService.flattenSchools(res) as any;
            }),
            catchError(e => this.handleError(e))
        );
    }


}
