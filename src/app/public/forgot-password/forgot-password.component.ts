import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/model-service/user.service';
import { ToasterService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  user: User;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ]
    });
  }

  async onReset() {
    if (!this.resetForm.valid) {
      this.presentAlertPrompt();
      return;
    }
    // this.loading = await this.loadCtrl.create({
    //   message: 'Processing ...'
    // });
    // this.loading.dismiss();

    // Perform reset here
    this.userService.RequestResetLink(this.resetForm.value.email).subscribe(res => {
      // this.loading.dismiss();
      // this.alertCtrl.create({
      //   header: 'Info',
      //   message:
      //     'Reset link has been sent to your email',
      //   buttons: [
      //     {
      //       text: 'Ok',
      //       handler: () => {
      //         this.router.navigate([
      //           '/login'
      //         ]);
      //       }
      //     }
      //   ]
      // }).then(_ => _.present());

      console.log('Reset link has been sent to your email');
    }, error => {
      // this.loading.dismiss();
      console.log(error);
      // const temp = this.resetForm.value.email.split('@');
      // if (temp.length > 1) {
      //   this.emailBrowser('https://www.' + temp[1]);
      // }
    });
  }


  async presentAlertPrompt() {
    // const alert = await this.alertCtrl.create({
    //   header: 'Alert',
    //   message:
    //     'Please check your email',
    //   buttons: [
    //     {
    //       text: 'Ok',
    //       handler: () => {
    //         // console.log('Confirm Ok');
    //       }
    //     }
    //   ]
    // });
    // await alert.present();

    console.log('Please check your email');
  }

}
