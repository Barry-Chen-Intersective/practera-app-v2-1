import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from '../../shared/notification/notification.service';
import { AuthService } from '../auth.service';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  email: string;
  key: string;

  verifySuccess = false;
  isResetting = false;

  custom = {
    logo: null,
  };

  resetPasswordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
    },
    { validators: this.checkPasswordMatching }
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: BrowserStorageService,
  ) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.email = this.route.snapshot.paramMap.get('email');

    if (!this.key || !this.email) {
      return this._notifyAndRedirect('Invalid reset password link');
    }
    // Call API to verify that key and email parameters from reset password URL are valid
    this.authService.verifyResetPassword({key: this.key, email: this.email}).subscribe(
      res => {
        // verification of key and email is successfuly.
        this.verifySuccess = true;
      },
      err => {
        return this._notifyAndRedirect('Invalid reset password link');
      }
    );
  }

  ionViewWillEnter() {
    this.custom.logo = this.storage.getUser().logo;
    if (this.storage.getUser().themeColor) {
      this.utils.changeThemeColor(this.storage.getUser().themeColor);
    }
  }

  resetPassword() {
    const data = {
      key: this.key,
      email: this.email,
      password: this.resetPasswordForm.controls.password.value,
      verify_password: this.resetPasswordForm.controls.confirmPassword.value
    };

    this.authService.resetPassword(data).subscribe(
      res => {
        return this._notifyAndRedirect('Password successfully changed!. Please login with the new password.');
      },
      err => {
        return this.notificationService.presentToast('Error updating password.Try again', false);
      }
    );
  }

  checkPasswordMatching(resetPasswordForm: FormGroup) {
    const password = resetPasswordForm.controls.password.value;
    const confirmPassword = resetPasswordForm.controls.confirmPassword.value;

    return password === confirmPassword ? null : { notMatching : true };
  }

  private _notifyAndRedirect(msg) {
    this.notificationService.alert({
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
  }

}
