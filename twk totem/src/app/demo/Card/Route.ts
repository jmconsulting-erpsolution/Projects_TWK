import { Routes } from '@angular/router';

import { CardComponent } from './card.component';
import { ROUTING_ELEMENT, ROUTING_PARENT , ROUTING_ID} from '../../app-config';

export const routes: Routes = [
  {
    path: '',
    component: CardComponent,
    data: {
      title: 'Card'
    }
  },
  {
    path: ':' + ROUTING_ID,
    loadComponent: () => import('./card.component').then(m => m.CardComponent),
    data: {
      title: 'Card'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT + '/:' + ROUTING_ID,
    loadComponent: () => import('./card.component').then(m => m.CardComponent),
    data: {
      title: 'Card'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT + '/:' + ROUTING_PARENT + '1' + '/:' + ROUTING_PARENT + '2',
    loadComponent: () => import('./card.component').then(m => m.CardComponent),
    data: {
      title: 'Card'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT + '/:' + ROUTING_PARENT + '1' + '/:' + ROUTING_PARENT + '2' + '/:' + ROUTING_PARENT + '3',
    loadComponent: () => import('./card.component').then(m => m.CardComponent),
    data: {
      title: 'Card'
    }
  }   
];
