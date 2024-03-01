import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { RouterLink } from '@angular/router';
import {
  MenuController,
  SegmentChangeEventDetail,
} from '@ionic/angular/standalone';
import {
  CdkScrollableModule,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    ScrollingModule,
    CdkScrollableModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
  ],
})
export class DiscoverPage implements OnInit {
  places: Place[] = [];
  placesToScroll: Place[] = [];
  constructor(
    private placesService: PlacesService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.places = this.placesService.places;
    this.placesToScroll = [
      ...this.placesService.places.slice(1),
      ...this.placesService.places.slice(1),
      ...this.placesService.places.slice(1),
    ];
  }
  onOpenMenu() {
    this.menu.open('m1');
  }

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
