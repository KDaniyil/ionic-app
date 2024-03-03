import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItemSliding, IonicModule, LoadingController } from '@ionic/angular';
import { BookingService } from './booking.service';
import { Booking } from './booking.modelts';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ScrollingModule],
})
export class BookingsPage implements OnInit {
  bookings: Booking[] = [];
  destroyRef = inject(DestroyRef);
  constructor(
    private bookingService: BookingService,
    private loadingController: LoadingController
  ) {
    addIcons({ trash });
  }

  ngOnInit() {
    this.bookingService.bookings
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((bookings) => {
        this.bookings = bookings;
      });
  }

  onCancel(bookingId: string, slidingElement: IonItemSliding) {
    slidingElement.close();
    this.loadingController
      .create({ message: 'Cancelling...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService
          .cancelBooking(bookingId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            loadingEl.dismiss();
          });
      });
  }
}
