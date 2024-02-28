import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class DiscoverPage implements OnInit {
  places: Place[] = [];
  constructor(
    private placesService: PlacesService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.places = this.placesService.places;
  }
  onOpenMenu() {
    this.menu.open('m1');
  }
}
