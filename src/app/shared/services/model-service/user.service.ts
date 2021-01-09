import { MySignals } from 'src/app/shared/services/my-signals';
import { UserConfig } from './../../../models/user';
import { PageInfo, getPagedData } from '../../../models/page';
import { Router } from '@angular/router';
import { API_ROOT_URL, DOWNLOAD_CONTAINER, USER_DEFAULT_COVER_URL, USER_DEFAULT_PHOTO_URL } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CredentialsInterface, User, UserInterface } from '../../../models/user';
import { UtilityService } from '../providers/utility.service';
import { PhotoType, IdentityPhoto, Photo } from 'src/app/models/my-media';
import { MyDevice } from 'src/app/models/my-device';
import { SchoolInterface } from 'src/app/models/school';
import { Address } from 'src/app/models/address';
import { MyStorage } from '../providers/my-storage.service';

export interface Token {
  token: '';
}



@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: Token = null;
  redirectUrl = '';


  private userAuthenticatedSource = new Subject<User>();
  userAuthenticatedSource$ = this.userAuthenticatedSource.asObservable();

  constructor(
    private http: HttpClient,
    private store: MyStorage,
    private router: Router,
    private signals: MySignals) {
    this.getToken().then(token => {
      this.token = token;
    });

  }


  static getUserIdentityPhoto(user: User) {
    // console.log(user?.photos);
    const photo: IdentityPhoto = {} as any;
    user?.photos?.forEach(ph => {
      if (ph.profile) {
        ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileName ?? USER_DEFAULT_PHOTO_URL;
        ph.thumbnailUrl = DOWNLOAD_CONTAINER + 'thumb_' + ph.fileName ?? USER_DEFAULT_PHOTO_URL;
        photo.profile = ph;
      }

      if (ph.coverImage) {
        ph.fileUrl = DOWNLOAD_CONTAINER + ph.fileName ?? USER_DEFAULT_COVER_URL;
        photo.cover = ph;
      }
    });

    if (!photo.profile && !photo?.cover) {
      photo.profile = new Photo();
      photo.profile.fileUrl = USER_DEFAULT_PHOTO_URL;
      photo.profile.thumbnailUrl = USER_DEFAULT_PHOTO_URL;

      photo.cover = new Photo();
      photo.cover.fileUrl = '';
      photo.cover.thumbnailUrl = '';
    }
    return photo;
  }

  static getUserProfilePhotoUrl(identityPhoto: IdentityPhoto) {
    return identityPhoto?.profile?.thumbnailUrl || USER_DEFAULT_PHOTO_URL;
  }

  static getUserCoverPhotoUrl(identityPhoto: IdentityPhoto) {
    return identityPhoto?.cover?.thumbnailUrl || USER_DEFAULT_COVER_URL;
  }

  static checkOwnerShip(user1: User, user2: User) {
    // console.log(user1);
    // console.log(user2);
    if (!user1?.id || !user2?.id || (user1?.id !== user2?.id)) {
      console.log('not owner');
      return false;
    } else {
      console.log('is owner');
      return true;
    }
  }

  announceUserAuthenticated(user: User) {
    this.userAuthenticatedSource.next(user);
  }

  signUp(user: User) {
    return this.http.post<User>('/signup', user).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  login(data: Credential): Observable<Token> {
    return this.http.post<Token>('/login', data).pipe(
      map(res => {
        this.token = res as any;
        if (this.token.token) {
          this.saveToken(this.token);
          // console.log(res);
          // fetch user data
          this.getMyProfile().subscribe(_ => _);
        }
        this.router.navigateByUrl(this.redirectUrl);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  logout() {
    this.token = null;
    this.deleteToken(); // delete jwt auth token
    this.deleteUserLocal(); // clear user details
    this.announceUserAuthenticated(null); // send signal to log user out
    this.signals.announceCurrentUser(null);
  }

  async getToken(): Promise<Token> {
    return await this.store.getObject('token');
  }

  saveToken(token: Token) {
    /** Save the authentication token **/
    this.store.setObject('token', token);
  }

  deleteToken() {
    this.store.remove('token');
  }

  isAuthenticated() {
    if (this.token) {
      return true;
    }
    return false;
  }

  RequestResetLink(email: string) {
    return this.http.post<User>('/users/reset-password', { email }).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  changePassword(passObj: { password: string, token: string }) {
    return this.http.post<boolean>(`/users/change-password`, passObj).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );

  }


  requestVerificationLink(email: string) {
    return this.http.post<User>('/email-verification', { email }).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }



  updateUser(user: CredentialsInterface | UserInterface): Observable<User> {
    return this.http.patch<User>('/users/' + user.id, user).pipe(
      map(res => {
        console.log(res);
        const user = new User(res, res as CredentialsInterface) as any;
        this.store.setObject('user', user).then(_ => _);
        return user;
      }),
      catchError(e => this.handleError(e))
    );
  }


  // Quick user peep
  getMe(): Observable<User> {
    return this.http.get<User>('/users/me').pipe(
      map(res => {
        this.store.setObject('user', res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  // Get user details
  getMyProfile(): Observable<User> {
    return this.http.get<User>('/users/my-profile').pipe(
      map(res => {
        /** Save the authentication token **/
        this.setUserLocal(res);
        this.announceUserAuthenticated(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUsers(pageInfo?: PageInfo): Observable<User[]> {
    let filter;
    if (pageInfo) {
      filter = {
        // order: 'id DESC',
        offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit,
        // skip: pageInfo.count
      };
    }
    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = '/users' + filter;
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUsersByIds(ids: string[], pageInfo?: PageInfo): Observable<User[]> {
    let filter;
    if (pageInfo) {
      filter = {
        offset: pageInfo.offset * pageInfo.limit,
        limit: pageInfo.limit,
        where: {
          id: { inq: ids }
        },
      };
    }
    filter.include = [
      { relation: 'photos' },
      { relation: 'address' },
    ];

    filter = filter ? '?filter=' + JSON.stringify(filter) : '';
    const url = '/users' + filter;
    // console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }
  // arg: isCurrentUser is used to update the data on disk for
  // the currently logged in user
  getUserDetails(userId: any, filter?: any, isCurrentUser = true) {
    if (!filter) {
      filter = {
        include: [
          { relation: 'photos' },
          {
            relation: 'devices',
            scope: {
              include: [
                {
                  relation: 'topics'
                }
              ]
            }
          },
          { relation: 'address' },
          { relation: 'userConfigs' },
          { relation: 'post' },
          {
            relation: 'alumni',
            scope: {
              include: [
                {
                  relation: 'school',
                  // scope: {
                  //   include: [
                  //     { relation: 'photos' }]
                  // }
                }
              ]
            }
          }
        ]
      };
    }
    const url = `/users/${userId}?filter=` + JSON.stringify(filter);
    return this.http.get<User>(url).pipe(
      map(res => {
        // console.log(res);
        if (isCurrentUser) {
          this.setUserLocal(res).then(_ => _);
          this.signals.announceCurrentUser(res);
        } else {
          this.setSelectedUserLocal(res);
        }

        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  getUserProfile(userId: any): Observable<User> {
    const filter = {
      include: [
        {
          relation: 'photos',
          scope: {
            where: {
              profile: true
            }
          }
        },
        { relation: 'address' }
      ]
    };
    const url = `/users/${userId}?filter=` + JSON.stringify(filter);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        // console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }



  countUsers(): Observable<number> {
    return this.http.get<User[]>('/users/count').pipe(
      map(res => {
        if (res) {
          return (res as any).count;
        }
        return 0;
      }),
      catchError(e => this.handleError(e))
    );
  }

  searchUser(searchKey = 'all', pageInfo?: PageInfo): Observable<User[]> {
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
    const url = '/users-search/' + searchKey + '?filter=' + JSON.stringify(filter) ?? '';
    console.log(url);
    return this.http.get<User[]>(url).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  /****
   * ADD OR UPDATE ADDRESS
   */

  createUpdateAddress(userId: number, address: Address): Observable<Address> {
    if (address.id) { // perform update
      return this.http.patch<Address>(`/users/${userId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return address as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<Address>(`/users/${userId}/address`, address).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }


  /***************************************************
   *  USER CONFIGURATION
   ****************************************************/
  createOrUpdateConfig(userId: any, cfg: UserConfig) {
    if (cfg.id) { // perform update
      return this.http.patch<UserConfig>(`/users/${userId}/user-configs`, cfg).pipe(
        map(res => {
          // console.log(res);
          return cfg as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<UserConfig>(`/users/${userId}/user-configs`, cfg).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }

  getConfig(userId: any) {
    return this.http.get<UserConfig>(`/users/${userId}/user-configs`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  deleteConfig(userId, cfg: UserConfig) {
    const where = {
      id: cfg.id
    };
    return this.http.delete<UserConfig>(`/users/${userId}/user-configs?where=${where}`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }


  /*****************************************************************
   * CREATE DEVICE
   *****************************************************************/
  getUserDevice(userId: any) {
    const filter = {
      include: [
        { relation: 'topics' }
      ],
      where: {
        playerId: userId
      }
    };
    return this.http.get<MyDevice>(`/devices?filter=${JSON.stringify(filter)}`).pipe(
      map(res => {
        console.log(res);
        return res as any;
      }),
      catchError(e => this.handleError(e))
    );
  }

  createOrUpdateDevice(device: MyDevice) {
    if (device.id) { // perform update
      return this.http.patch<MyDevice>(`/devices/${device.id}`, device).pipe(
        map(res => {
          // console.log(res);
          return device as any;
        }),
        catchError(e => this.handleError(e))
      );
    } else {
      return this.http.post<MyDevice>(`/devices/`, device).pipe(
        map(res => {
          // console.log(res);
          return res as any;
        }),
        catchError(e => this.handleError(e))
      );
    }
  }


  /**************************************/
  /************Lock screen***************/
  /**************************************/
  lockScreen() {
    // generate the number
    const max = 1000, min = 100;
    const code = Math.floor(Math.random() * (max - min) + min);
    this.store.set('lock_code', code);
    return code;
  }

  async unlockScreen(code: number): Promise<boolean> {
    const stored_code: number = await this.store.get('lock_code');
    if (stored_code === code) {
      await this.store.remove('lock_code');
      return true;
    } else {
      return false;
    }
  }

  async isScreenLocked() {
    const stored_code: number = await this.store.get('lock_code');
    if (stored_code) {
      return true;
    }
    return false;
  }

  /////////////////////////////////////////////////////////////////////////
  /*************Local user access*****/
  ///////////////////////////////////////////////////////////////////////////



  // Read user object from sesson storage
  async getUserLocal(): Promise<User> {
    return await this.store.getObject('user');
  }

  deleteUserLocal() {
    this.store.remove('user');
  }

  async setUserLocal(user: User): Promise<boolean> {
    return await this.store.setObject('user', user);
  }

  getOwnerImage(user: User, photoType?: PhotoType) {
    // console.log(user);
    const identityPhoto: IdentityPhoto = {
      cover: null,
      profile: null,
      flag: null,

    } as IdentityPhoto;
    if (user?.photos?.length > 0) {
      for (const photo of user.photos) {
        if (photo.coverImage) {
          identityPhoto.cover = photo;
          if (photoType === PhotoType.cover) {
            return (DOWNLOAD_CONTAINER + identityPhoto?.cover?.fileName);
          }
        }
        if (photo.profile) {
          identityPhoto.profile = photo;
          if (photoType === PhotoType.profile) {
            return (DOWNLOAD_CONTAINER + identityPhoto?.profile?.fileName);
          }
        }
        if (photo.flag) {
          identityPhoto.flag = photo;
          if (photoType === PhotoType.flag) {
            return (DOWNLOAD_CONTAINER + identityPhoto?.flag?.fileName);
          }
        }
      }
    }
    return USER_DEFAULT_PHOTO_URL;
  }



  async getSelectedUserLocal(): Promise<User> {
    return await this.store.getObject('selected-user');
  }

  deleteSelectedUserLocal() {
    this.store.remove('selected-user');
  }

  async setSelectedUserLocal(user: User): Promise<boolean> {
    return await this.store.setObject('selected-user', user);
  }

  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }
}
