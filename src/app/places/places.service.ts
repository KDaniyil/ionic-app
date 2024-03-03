import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, delay, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://th.bing.com/th/id/OIP.pL__it51_6AHLai_8CMtVwHaE8?w=260&h=180&c=7&r=0&o=5&pid=1.7',
      149.99,
      new Date('2022-01-01'),
      new Date('2022-01-15'),
      'abc'
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://i.ytimg.com/vi/ja8V6pOcs_w/maxresdefault.jpg',
      189.99,
      new Date('2022-01-16'),
      new Date('2022-01-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://th.bing.com/th/id/OIP.E6hmmllEEd-Slh4kJC5EgwHaE5?rs=1&pid=ImgDetMain',
      99.99,
      new Date('2022-02-01'),
      new Date('2022-02-28'),
      'abc'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places: Place[]) => {
        return { ...(this._places.value.find((p) => p.id === id)! as Place) };
      })
    );
    //return { ...(this._places.value.find((p) => p.id === id)! as Place) };
  }

  /**
   * funzione per aggiungere un nuovo posto
   * @param title
   * @param description
   * @param price
   * @param dateFrom
   * @param dateTo
   */
  addPlaces(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://th.bing.com/th/id/OIP.pL__it51_6AHLai_8CMtVwHaE8?w=260&h=180&c=7&r=0&o=5&pid=1.7',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(2000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updateOffer(offerId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(2000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === offerId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
