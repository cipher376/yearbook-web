import {
  Photo, PostAudioLink, PostDocumentLink, PostPhotoLink,
  PostVideoLink, Video, Audio, Document
} from '../../../models/my-media';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { UtilityService } from '../providers/utility.service';
import { MyStorage } from '../providers/my-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  redirectUrl = '';

  constructor(private http: HttpClient, private store: MyStorage) {

  }
  createManyPhotos(photos: Photo[]): Observable<Photo[]> {
    return this.http.post<Photo[]>(`/photos-createMany`, photos).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }

  linkPostToVideo(links: PostVideoLink[]): Observable<PostVideoLink[]> {
    return this.http.post<PostVideoLink[]>(`/link-post-to-video-many`, links).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'Video link')))
    );
  }
  linkPostToAudio(links: PostAudioLink[]): Observable<PostAudioLink[]> {
    return this.http.post<PostAudioLink[]>(`/link-post-to-audio-many`, links).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }
  linkPostToDocument(links: PostDocumentLink[]): Observable<PostDocumentLink[]> {
    return this.http.post<PostDocumentLink[]>(`/link-post-to-document-many`, links).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }

  linkPostToPhoto(links: PostPhotoLink[]): Observable<PostPhotoLink[]> {
    return this.http.post<PostPhotoLink[]>(`/link-post-to-photo-many`, links).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }

  updatePhoto(photo: Photo) {
    return this.http.patch<Photo>(`/photos/${photo.id}`, photo).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }
  updateVideo(video: Video) {
    return this.http.patch<Video>(`/videos/${video.id}`, video).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }
  deletePhoto(photoId: any) {
    return this.http.delete<Photo>(`/photos/${photoId}`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }

  createSchoolPhoto(schoolId: any, photo: Photo) {
    if (!photo.id) {
      return this.http.post<Photo>(`/schools/${schoolId}/photos`, photo).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
      );
    } else {
      return this.http.patch<Photo>(`/schools/${schoolId}/photos`, photo).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
      );
    }
  }

  createSchoolVideo(schoolId: any, video: Video) {
    if (!video.id) {
      return this.http.post<Photo>(`/schools/${schoolId}/videos`, video).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School video')))
      );
    } else {
      return this.http.patch<Photo>(`/schools/${schoolId}/videos`, video).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School video')))
      );
    }
  }


  getSchoolPhotos(schoolId: any, filter: any = null) {
    if (!schoolId) {
      return;
    }
    if (!filter) {
      filter = {
        order: 'id DESC',

      };
    }
    const url = `/schools/${schoolId}/photos?filter=` + JSON.stringify(filter);
    return this.http.get<Photo[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School photo')))
    );
  }

  getSchoolVideos(schoolId: any, filter: any = null) {
    if (!schoolId) {
      return;
    }
    if (!filter) {
      filter = {
        order: 'id DESC',

      };
    }
    const url = `/schools/${schoolId}/videos?filter=` + JSON.stringify(filter);
    return this.http.get<Video[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'School video')))
    );
  }

  createUserPhoto(userId: any, photo: Photo) {
    if (!photo?.id) {
      return this.http.post<Photo>(`/users/${userId}/photos`, photo).pipe(
        map(res => {
          console.log(JSON.stringify(res));
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User photo')))
      );
    } else {
      return this.http.patch<Photo>(`/users/${userId}/photos`, photo).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User photo')))
      );
    }
  }
  createUserVideo(userId: any, video: Video) {
    if (!video?.id) {
      return this.http.post<Video>(`/users/${userId}/videos`, video).pipe(
        map(res => {
          console.log(JSON.stringify(res));
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User video')))
      );
    } else {
      return this.http.patch<Video>(`/users/${userId}/videos`, video).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User video')))
      );
    }
  }

  // turns off the photo profile field to false
  clearAllUserProfilePhotos(userId: any){
    return this.http.get(`/users/clear-profile-photos/${userId}`).pipe(
      map(res => {
        console.log(JSON.stringify(res));
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User video')))
    );
  }


  getUserPhotos(userId: any, filter: any = null) {
    if (!userId) {
      console.log('Invalid user id');
      return;
    }
    if (!filter) {
      filter = {
        order: 'id DESC',

      };
    } else {
      filter.order = 'id DESC';
    }
    const url = `/users/${userId}/photos?filter=` + JSON.stringify(filter);
    return this.http.get<Photo[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User photo')))
    );
  }
  getUserVideos(userId: any, filter: any = null) {
    if (!userId) {
      console.log('Invalid user id');
      return;
    }
    if (!filter) {
      filter = {
        order: 'id DESC',

      };
    }
    const url = `/users/${userId}/videos?filter=` + JSON.stringify(filter);
    return this.http.get<Video[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User video')))
    );
  }
  getUserAudios(userId: any, filter: any = null) {
    if (!userId) {
      console.log('Invalid user id');
      return;
    }
    if (!filter) {
      filter = {
        order: 'id DESC',

      };
    }
    const url = `/users/${userId}/audio?filter=` + JSON.stringify(filter);
    return this.http.get<Audio[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User audio')))
    );
  }
  getUserDocuments(userId: any, filter: any = null) {
    if (!userId) {
      console.log('Invalid user id');
      return;
    }
    if (!filter) {
      filter = {
        order: 'id DESC',

      };
    }
    const url = `/users/${userId}/documents?filter=` + JSON.stringify(filter);
    return this.http.get<Document[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User audio')))
    );
  }

  createUserAudio(userId: any, audio: Audio) {
    if (!audio?.id) {
      return this.http.post<Audio>(`/users/${userId}/audio`, audio).pipe(
        map(res => {
          console.log(JSON.stringify(res));
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User audio')))
      );
    } else {
      return this.http.patch<Audio>(`/users/${userId}/audio`, audio).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User audio')))
      );
    }
  }

  createUserDocument(userId: any, document: Document) {
    if (!document?.id) {
      return this.http.post<Document>(`/users/${userId}/documents`, document).pipe(
        map(res => {
          console.log(JSON.stringify(res));
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User document')))
      );
    } else {
      return this.http.patch<Document>(`/users/${userId}/documents`, document).pipe(
        map(res => {
          console.log(res);
          return res as any;
        }),
        catchError(e => throwError(UtilityService.myHttpErrorFormat(e, 'User document')))
      );
    }
  }
}
