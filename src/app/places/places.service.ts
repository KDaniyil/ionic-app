import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://th.bing.com/th/id/OIP.pL__it51_6AHLai_8CMtVwHaE8?w=260&h=180&c=7&r=0&o=5&pid=1.7',
      149.99
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://i.ytimg.com/vi/ja8V6pOcs_w/maxresdefault.jpg',
      189.99
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://th.bing.com/th/id/OIP.E6hmmllEEd-Slh4kJC5EgwHaE5?rs=1&pid=ImgDetMain',
      99.99
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}
}
