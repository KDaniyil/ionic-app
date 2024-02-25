import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { search, card } from 'ionicons/icons';
import { IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonRouterLink],
})
export class PlacesPage {
  constructor() {
    addIcons({ search, card });
  }
}
