import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/model-service/user.service';
import { ToasterService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toaster: ToasterService,
    private fb: FormBuilder,

  ) {
    this.userService.getUserLocal().then(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      ],
      remember: [false]
    });
  }



  async onLogin() {
    if (!this.loginForm.valid) {
      this.toaster.toast('Provide valid credentials');
      return;
    }
    // this._loading = await this.loadCtrl.create({
    //   message: 'Welcome to<br>alma mater',
    //   duration: 5000
    // });
    // await this._loading.present();
    await this.userService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        if (res.token) {
          console.log(res);
          // fetch user details
          this.userService.getMyProfile().subscribe(user => {
            this.user = user;
            console.log(this.user);
            alert('Login from the mobile app');
            // if (this.user?.phone) {
            //   this.router.navigateByUrl('/links/home');
            // } else {
            //   this.router.navigateByUrl('/phone-number');
            // }
          });
        }
        // this._loading.dismiss().then(_ => _);
      },
      error => {
        console.log(error);
        this.toaster.toast(error.message);
        // this._loading.dismiss().then(_ => _);

        // if (error.search('verified') > -1) {
        //   this.alertCtrl.create({
        //     header: `Email is not verified. A verification link is sent to the email provided but it may take up 10min to show up. check spam if not in your In-box Verify your email now?`,
        //     message: '',
        //     buttons: [
        //       {
        //         text: 'No',
        //         role: 'cancel',
        //         cssClass: 'secondary',
        //         handler: (blah) => {
        //           this.toaster.toast('Email is not verified! Check your email for verification link or reset password', 60);
        //         }
        //       }, {
        //         text: 'Yes',
        //         handler: () => {
        //           const temp = this.loginForm.value.email.split('@');
        //           if (temp.length > 1) {
        //             // this.emailBrowser('https://www.' + temp[1]);
        //           }
        //         }
        //       }
        //     ],
        //     translucent: true,
        //   }).then(alert => alert.present());
        // } else {
        //   this.toaster.toast('Check Credentials | Network');
        // }
      }
    );
  }

  gotoForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  gotoRegister() {
    this.router.navigateByUrl('/register');
  }


}
