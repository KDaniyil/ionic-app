import { Routes } from '@angular/router';
import { PlacesPage } from './places/places.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'places',
    pathMatch: 'full',
  },
  {
    path: 'places',
    component: PlacesPage,

    children: [
      {
        path: 'discover',
        loadComponent: () =>
          import('./places/discover/discover.page').then((m) => m.DiscoverPage),
      },
      {
        path: 'discover/:placeId',
        loadComponent: () =>
          import('./places/discover/place-detail/place-detail.page').then(
            (m) => m.PlaceDetailPage
          ),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./places/offers/offers.page').then((m) => m.OffersPage),
        children: [
          {
            path: 'new',
            loadComponent: () =>
              import('./places/offers/new-offer/new-offer.page').then(
                (m) => m.NewOfferPage
              ),
          },
          {
            path: 'edit/:placeId',
            loadComponent: () =>
              import('./places/offers/edit-offer/edit-offer.page').then(
                (m) => m.EditOfferPage
              ),
          },
          {
            path: ':placeId',
            loadComponent: () =>
              import('./places/offers/offer-bookings/offer-bookings.page').then(
                (m) => m.OfferBookingsPage
              ),
          },
        ],
      },
    ],
  },

  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
  },

  {
    path: 'bookings',
    loadComponent: () =>
      import('./bookings/bookings.page').then((m) => m.BookingsPage),
  },
];
