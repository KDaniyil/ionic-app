import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class PlaceDetailPage {
  constructor(private router: Router, private navCtrl: NavController) {}

  onBookPlace() {
    //this.router.navigateByUrl('/places/discover');
    this.navCtrl.navigateBack('/places/discover');
    //this.navCtrl.pop();
  }
}
