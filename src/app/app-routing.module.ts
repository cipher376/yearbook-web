import { RegisterComponent } from './public/register/register.component';
// import { LoginComponent } from './public/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './public/change-password/change-password.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { SuggestionComponent } from './public/suggestion/suggestion.component';
import { FaqComponent } from './public/faq/faq.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'suggestion',
    component: SuggestionComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component:  LoginComponent},  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
