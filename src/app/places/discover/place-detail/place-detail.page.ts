import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActionSheetController,
  IonicModule,
  NavController,
} from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class PlaceDetailPage implements OnInit {
  place!: Place;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCntr: ModalController,
    private actionSheetCntrl: ActionSheetController
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
      const placeId = paramMap.get('placeId');
      this.place = this.placesService.getPlace(placeId!);
    });
  }

  onBookPlace() {
    this.actionSheetCntrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });

    //this.router.navigateByUrl('/places/discover');
    //this.navCtrl.navigateBack('/places/discover');
    //this.navCtrl.pop();
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCntr
      .create({
        component: CreateBookingComponent,
        animated: true,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('BOOKED!');
        }
      });
  }
}
