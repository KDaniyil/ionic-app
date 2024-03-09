import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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
  destroyRef = inject(DestroyRef);
  relevantPlaces: Place[] = [];
  isLoading = false;
  constructor(
    private placesService: PlacesService,
    private menu: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesService.places
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((places) => {
        this.places = places as Place[];
        this.placesToScroll = [...this.places.slice(1)];
        this.relevantPlaces = this.places.slice(1);
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menu.open('m1');
  }

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.places;
      this.placesToScroll = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.places.filter(
        (place) => place.userId !== this.authService.userId
      );
      this.placesToScroll = this.relevantPlaces.slice(1);
    }
  }
}
