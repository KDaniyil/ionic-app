import { Component, Input, OnInit, input } from '@angular/core';
import { Place } from '../../place.model';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, CommonModule],
})
export class OfferItemComponent {
  constructor() {}
  @Input() offer!: Place;
  getDammyDate() {
    return new Date();
  }
}
