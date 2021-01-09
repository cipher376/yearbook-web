import { PushMessage } from './../../models/push-message';
import { Alumni } from './../../models/alumni';
import { School } from './../../models/school';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../models/user';
import { Photo, Video } from 'src/app/models/my-media';
import { LatLng } from 'src/app/models/latLng';
import { AudioLocal } from 'src/app/models/LocalMediaInterfaces';
import { MyStorage } from './providers/my-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MySignals {

  constructor(private store: MyStorage) { }


  private loggerSource = new Subject<any>();
  loggerSource$ = this.loggerSource.asObservable();

  private closeModalSource = new Subject<string>();
  closeModalSource$ = this.closeModalSource.asObservable();

  private uploadCompleteSource = new Subject<any>();
  uploadCompleteSource$ = this.uploadCompleteSource.asObservable();

  private allUploadCompleteSource = new Subject<any[]>();
  allUploadCompleteSource$ = this.allUploadCompleteSource.asObservable();


  private selectedUsersSource = new Subject<User[]>();
  selectedUsersSource$ = this.selectedUsersSource.asObservable();

  private selectedSchoolsSource = new Subject<School[]>();
  selectedSchoolsSource$ = this.selectedSchoolsSource.asObservable();
  private selectedSchoolSource = new Subject<School>();
  selectedSchoolSource$ = this.selectedSchoolSource.asObservable();
  private countSchoolSource = new Subject<number>();
  countSchoolSource$ = this.countSchoolSource.asObservable();




  private selectedAlumniSource = new Subject<Alumni[]>();
  selectedAlumniSource$ = this.selectedAlumniSource.asObservable();
  private selectedAlumnusSource = new Subject<Alumni>();
  selectedAlumnusSource$ = this.selectedAlumnusSource.asObservable();
  private selectedSchoolAlumniCountSource = new Subject<number>();
  selectedSchoolAlumniCountSource$ = this.selectedSchoolAlumniCountSource.asObservable();




  private imagesLoadedSource = new Subject<Photo[]>();
  imagesLoadedSource$ = this.imagesLoadedSource.asObservable();

  private selectedPhotosSource = new Subject<Photo[]>();
  selectedPhotosSource$ = this.selectedPhotosSource.asObservable();

  private videosLoadedSource = new Subject<Video[]>();
  videosLoadedSource$ = this.videosLoadedSource.asObservable();

  private profilePhotoChangeSource = new Subject<Photo>();
  profilePhotoChangeSource$ = this.profilePhotoChangeSource.asObservable();

  private flagPhotoChangeSource = new Subject<Photo>();
  flagPhotoChangeSource$ = this.flagPhotoChangeSource.asObservable();

  private coverPhotoChangeSource = new Subject<Photo>();
  coverPhotoChangeSource$ = this.coverPhotoChangeSource.asObservable();


  private locationChangeSource = new Subject<LatLng>();
  locationChangeSource$ = this.locationChangeSource.asObservable();



  // private selectedPoliciesSource = new Subject<Policy[]>();
  // selectedPoliciesSource$ = this.selectedPoliciesSource.asObservable();
  // private selectedPolicySource = new Subject<Policy>();
  // selectedPolicySource$ = this.selectedPolicySource.asObservable();
  // private countPolicySource = new Subject<number>();
  // countPolicySource$ = this.countPolicySource.asObservable();
  // private policyChangeSource = new Subject<boolean>();
  // policyChangeSource$ = this.policyChangeSource.asObservable();

  // private selectedRolesSource = new Subject<Role[]>();
  // selectedRolesSource$ = this.selectedRolesSource.asObservable();
  // private selectedRoleSource = new Subject<Role>();
  // selectedRoleSource$ = this.selectedRoleSource.asObservable();
  // private countRoleSource = new Subject<number>();
  // countRoleSource$ = this.countRoleSource.asObservable();
  // private newRoleSource = new Subject<Policy>();
  // newRoleSource$ = this.newRoleSource.asObservable();


  private audioRecordingCompleteSource = new Subject<AudioLocal>();
  audioRecordingCompleteSource$ = this.audioRecordingCompleteSource.asObservable();


  announceAudioRecordingComplete(audioFile: AudioLocal) {
    this.audioRecordingCompleteSource.next(audioFile);
  }


  log(data: any) {
    this.loggerSource.next(data);
  }
  announceCloseModal(modalName?: string) {
    this.closeModalSource.next(modalName);
  }

  announceSelectedUsers(users: User[]) {
    this.selectedUsersSource.next(users);
  }

  private currentUserSource = new Subject<User>();
  currentUserSource$ = this.currentUserSource.asObservable();
  announceCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }


  announceSelectedSchools(schools: School[]) {
    this.selectedSchoolsSource.next(schools);
  }
  announceSchool(school: School) {
    this.selectedSchoolSource.next(school);
  }
  announceSchoolsCount(total: number) {
    this.countSchoolSource.next(total);
  }

  announceSelectedSchoolAlumniCount(total: number) {
    this.selectedSchoolAlumniCountSource.next(total);
  }

  announceAlumni(alumni: Alumni[]) {
    this.selectedAlumniSource.next(alumni);
  }

  announceAlumnus(alumnus: Alumni) {
    this.selectedAlumnusSource.next(alumnus);
  }

  announceImagesLoaded(photos: Photo[]) {
    this.imagesLoadedSource.next(photos);
  }
  announceSelectedPhotosChanged(photos: Photo[]) {
    this.selectedPhotosSource.next(photos);
  }
  announceVideosLoaded(videos: Video[]) {
    this.videosLoadedSource.next(videos);
  }

  announceProfilePhotoChange(photo: Photo) {
    this.profilePhotoChangeSource.next(photo);
  }

  announceCoverPhotoChange(photo: Photo) {
    this.coverPhotoChangeSource.next(photo);
  }

  announceFlagPhotoChange(photo: Photo) {
    this.flagPhotoChangeSource.next(photo);
  }

  announceLocationChange(latLng: LatLng) {
    this.locationChangeSource.next(latLng);
  }

  announceAllUploadComplete(files: any[]) {
    this.allUploadCompleteSource.next(files);
  }
  announceUploadComplete(file: any) {
    this.uploadCompleteSource.next(file);
  }
  // announceSelectedPolicies(policy: Policy[]) {
  //   this.selectedPoliciesSource.next(policy);
  // }
  // announcePolicy(policy: Policy) {
  //   this.selectedPolicySource.next(policy);
  // }
  // announcePoliciesCount(total: number) {
  //   this.countPolicySource.next(total);
  // }
  // announcePolicyChange(changed: boolean) {
  //   this.policyChangeSource.next(changed);
  // }


  // announceSelectedRoles(role: Role[]) {
  //   this.selectedRolesSource.next(role);
  // }
  // announceRole(role: Role) {
  //   this.selectedRoleSource.next(role);
  // }
  // announceRolesCount(total: number) {
  //   this.countRoleSource.next(total);
  // }
  // announceNewRole(role: Policy) {
  //   this.newRoleSource.next(role);
  // }

  /***************************************************
   *  ****************Reload signals******************
   *  ************************************************/
  private reloadSchoolsSource = new Subject<null>();
  reloadSchoolsSource$ = this.reloadSchoolsSource.asObservable();
  announceSchoolsReload() {
    this.reloadSchoolsSource.next();
  }

  private reloadUsersSource = new Subject<null>();
  reloadUsersSource$ = this.reloadUsersSource.asObservable();
  announceUsersReload() {
    this.reloadUsersSource.next();
  }

  private reloadUserSchoolsSource = new Subject<null>();
  reloadUserSchoolsSource$ = this.reloadUserSchoolsSource.asObservable();
  announceUserSchoolsReload() {
    this.reloadUserSchoolsSource.next();
  }

  private selectedUserSource = new Subject<null>();
  selectedUserSource$ = this.selectedUserSource.asObservable();
  announceSelectedUserChange() {
    this.selectedUserSource.next();
  }
  private reloadPostsSource = new Subject<null>();
  reloadPostsSource$ = this.reloadPostsSource.asObservable();
  announcePostReload() {
    this.reloadPostsSource.next();
  }


  private emojiCharSource = new Subject<any>();
  emojiCharSource$ = this.emojiCharSource.asObservable();
  announceEmojiChar(char: any) {
    this.emojiCharSource.next(char);
  }


  /****************FOLLOWING AND UNFOLLOWING USERS*********** */
  private followSource = new Subject<boolean>();
  followSource$ = this.followSource.asObservable();
  announceFollowed(isFollowed: boolean) {
    this.followSource.next(isFollowed);
  }

  /***
   *  SHARING NOTIFICATION
   */

  private shareSuccessSource = new Subject<boolean>();
  shareSuccessSource$ = this.shareSuccessSource.asObservable();
  announceShared(shared: boolean) {
    this.shareSuccessSource.next(shared);
  }


  /***
   *  SOCKET PUSH NOTIFICATION
   */

  private socketPushMessageSource = new Subject<PushMessage>();
  socketPushMessageSource$ = this.socketPushMessageSource.asObservable();
  announceNewSocketPushMessage(msg: PushMessage) {
    this.socketPushMessageSource.next(msg);
  }


  /******
   * REFRESH MAP
   */
  private resetMapSource = new Subject<boolean>();
  resetMapSource$ = this.resetMapSource.asObservable();
  announceMapReset() {
    this.resetMapSource.next(true);
  }




}
