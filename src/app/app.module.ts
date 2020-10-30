import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostViewTextComponent } from './components/post-view-text/post-view-text.component';
import { PostViewVideosComponent } from './components/post-view-videos/post-view-videos.component';
import { PostViewPhotosComponent } from './components/post-view-photos/post-view-photos.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PhotosViewMiniComponent } from './components/photos-view-mini/photos-view-mini.component';
import { PhotosViewLargeComponent } from './components/photos-view-large/photos-view-large.component';
import { SchoolListMiniComponent } from './components/school-list-mini/school-list-mini.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { SchoolAddComponent } from './components/school-add/school-add.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendsListMiniComponent } from './components/friends-list-mini/friends-list-mini.component';
import { FriendAddComponent } from './components/friend-add/friend-add.component';
import { GoogleMapLocationComponent } from './components/google-map-location/google-map-location.component';
import { TrendingPostComponent } from './components/trending-post/trending-post.component';
import { TrendingSchoolComponent } from './components/trending-school/trending-school.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatSingleComponent } from './components/chat-single/chat-single.component';
import { MessageViewMiniComponent } from './components/message-view-mini/message-view-mini.component';
import { MessageViewAllComponent } from './components/message-view-all/message-view-all.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { SplashComponent } from './public/splash/splash.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { TutorialComponent } from './public/tutorial/tutorial.component';
import { ChangePasswordComponent } from './public/change-password/change-password.component';
import { HomeComponent } from './public/home/home.component';
import { PrivacyComponent } from './public/privacy/privacy.component';
import { LicenseComponent } from './public/license/license.component';
import { SettingsComponent } from './public/settings/settings.component';
import { SchoolProfileComponent } from './members/school-profile/school-profile.component';
import { SchoolSearchComponent } from './members/school-search/school-search.component';
import { PeopleSearchComponent } from './members/people-search/people-search.component';
import { PersonProfileComponent } from './members/person-profile/person-profile.component';
import { MySchoolsComponent } from './members/my-schools/my-schools.component';

@NgModule({
  declarations: [
    AppComponent,
    PostViewTextComponent,
    PostViewVideosComponent,
    PostViewPhotosComponent,
    CreatePostComponent,
    PhotosViewMiniComponent,
    PhotosViewLargeComponent,
    SchoolListMiniComponent,
    SchoolListComponent,
    SchoolAddComponent,
    FriendsListComponent,
    FriendsListMiniComponent,
    FriendAddComponent,
    GoogleMapLocationComponent,
    TrendingPostComponent,
    TrendingSchoolComponent,
    ChatListComponent,
    ChatSingleComponent,
    MessageViewMiniComponent,
    MessageViewAllComponent,
    AccountMenuComponent,
    SplashComponent,
    LoginComponent,
    RegisterComponent,
    TutorialComponent,
    ChangePasswordComponent,
    HomeComponent,
    PrivacyComponent,
    LicenseComponent,
    SettingsComponent,
    SchoolProfileComponent,
    SchoolSearchComponent,
    PeopleSearchComponent,
    PersonProfileComponent,
    MySchoolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
