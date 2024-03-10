import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import {
  BehaviorSubject,
  Observable,
  delay,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

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

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  fetchPlaces() {
    return this.httpClient
      .get<{ [key: string]: Place }>(
        `${environment.ApiUrl}/offered-places.json`
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    return this.httpClient
      .get<PlaceData>(`${environment.ApiUrl}/offered-places/${id}.json`)
      .pipe(
        map((place: PlaceData) => {
          return new Place(
            id,
            place.title,
            place.description,
            place.imageUrl,
            place.price,
            new Date(place.availableFrom),
            new Date(place.availableTo),
            place.userId
          );
        })
      );
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
    let newPlaceId: string;
    return this.httpClient
      .post<{ name: string }>(`${environment.ApiUrl}/offered-places.json`, {
        ...newPlace,
        id: null,
      })
      .pipe(
        switchMap((resData) => {
          newPlaceId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places: Place[]) => {
          newPlace.id = newPlaceId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(2000),
    //   tap((places) => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updateOffer(offerId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === offerId);
        updatedPlaces = [...places];
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
        return this.httpClient.put(
          `${environment.ApiUrl}/offered-places/${offerId}.json`,
          {
            ...updatedPlaces[updatedPlaceIndex],
            id: null,
          }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
