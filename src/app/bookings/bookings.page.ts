import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItemSliding, IonicModule } from '@ionic/angular';
import { BookingService } from './booking.service';
import { Booking } from './booking.modelts';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class BookingsPage implements OnInit {
  bookings: Booking[] = [];
  constructor(private bookingService: BookingService) {
    addIcons({ trash });
  }

  ngOnInit() {
    this.bookings = this.bookingService.bookings;
  }

  onCancel(bookingId: string, slidingElement: IonItemSliding) {}
}
