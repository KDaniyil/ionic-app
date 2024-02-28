import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { business, checkbox, exit } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class AppComponent {
  constructor() {
    addIcons({ business, checkbox, exit });
  }
  onLogout() {}
}
