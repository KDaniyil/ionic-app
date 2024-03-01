import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AuthPage implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCntr: LoadingController
  ) {}

  ngOnInit() {
    console.log('AuthPage ngOnInit');
  }
  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCntr
      .create({ keyboardClose: true, message: 'Logging In...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/discover');
        }, 1500);
      });
  }
}
