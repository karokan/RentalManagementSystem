import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) {}
  isActive = false;
  isloading = false;

  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isloading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isloading = true;
    console.log(form.value.role);
    if (form.value.role == 'tenant') {
      this.authService.login(
        form.value.email,
        form.value.role,
        form.value.password
      );
    } else if (form.value.role == 'owner') {
      this.authService.loginOwner(
        form.value.email,
        form.value.role,
        form.value.password
      );
    }
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid');
      return;
    }
    if (form.value.confirmPassword != form.value.password) {
      alert('Fail password confirm');
      return;
    }
    this.authService.createUser(
      form.value.email,
      form.value.role,
      form.value.password
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
