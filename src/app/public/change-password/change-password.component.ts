import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/model-service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  resetToken = '';
  passwordChangeForm: FormGroup;
  user: User;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]
      ]
    });
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(args => {
      this.resetToken = args?.id;
    });
  }

  onPasswordChange() {

    const password: string = this.passwordChangeForm.value.password;
    const confirmPassword = this.passwordChangeForm.value.confirmPassword;
    if (password.length < 6) {
      alert('Your password is too short!');
      return;
    }
    if (password && confirmPassword && password === confirmPassword) {
      // update password word on the server
      this.userService.changePassword({ password, token: this.resetToken }).subscribe(res => {
        if (res) {
          alert('You password has been updated, please login from the app!');
        }
      });
    } else {
      alert('Password do not match!');
    }
  }

}
