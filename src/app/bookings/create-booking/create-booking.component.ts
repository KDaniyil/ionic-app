import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, trash } from 'ionicons/icons';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class CreateBookingComponent implements OnInit {
  @Input()
  selectedPlace: Place | undefined;
  @Input() selectedMode: 'select' | 'random' | undefined;
  // @ViewChild('form') form: NgForm;
  form = viewChild<NgForm>('form');
  startDate: string = '';
  endDate: string = '';
  constructor(private modalCtrl: ModalController) {
    addIcons({ trash, close });
  }
  ngOnInit(): void {
    if (this.selectedMode === 'random') {
      const availableFrom = new Date(this.selectedPlace?.availableFrom!);
      const availableTo = new Date(this.selectedPlace?.availableTo!);
      // if random mode is selected
      if (this.selectedMode === 'random') {
        this.startDate = new Date(
          availableFrom.getTime() +
            Math.random() *
              (availableTo.getTime() -
                7 * 24 * 60 * 60 * 1000 -
                availableFrom.getTime())
        ).toISOString();

        this.endDate = new Date(
          new Date(this.startDate).getTime() +
            Math.random() *
              (new Date(this.startDate).getTime() +
                6 * 24 * 60 * 60 * 1000 -
                new Date(this.startDate).getTime())
        ).toISOString();
      }
    }
  }
  onBook() {
    if (!this.form()?.valid || !this.datesValid()) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form()?.value['first-name'],
          lastName: this.form()?.value['last-name'],
          guestNumber: +this.form()?.value['guest-number'],
          startDate: new Date(this.form()?.value['date-from']),
          endDate: new Date(this.form()?.value['date-to']),
        },
      },
      'confirm'
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  datesValid() {
    const startDate = new Date(this.form()?.value['date-from']);
    const endDate = new Date(this.form()?.value['date-to']);
    return endDate > startDate;
  }
}
