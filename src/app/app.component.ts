import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { business, checkbox, exit } from 'ionicons/icons';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    addIcons({ business, checkbox, exit });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
