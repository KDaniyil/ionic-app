import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, calendar, create } from 'ionicons/icons';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding } from '@ionic/angular';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    OfferItemComponent,
  ],
})
export class OffersPage implements OnInit {
  offers: Place[] = [];
  destroyRef = inject(DestroyRef);
  constructor(private placesService: PlacesService, private router: Router) {
    addIcons({ add, create, calendar });
  }

  ngOnInit() {
    this.placesService.places
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((places) => (this.offers = places));
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'offers', 'edit', offerId]);
  }
  getDammyDate() {
    return new Date();
  }
}
