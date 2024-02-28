import { Component, Input } from '@angular/core';
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
  imports: [IonicModule],
})
export class CreateBookingComponent {
  @Input() selectedPlace: Place | undefined;
  constructor(private modalCtrl: ModalController) {
    addIcons({ trash, close });
  }
  onBook() {
    this.modalCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
