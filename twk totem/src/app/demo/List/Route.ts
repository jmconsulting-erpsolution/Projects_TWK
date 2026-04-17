import { Routes } from '@angular/router';

import { ListComponent } from './list.component';
import { ROUTING_ELEMENT, ROUTING_PARENT } from '../../app-config';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'List'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT,
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    data: {
      title: 'List'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT + '/:' + ROUTING_PARENT + '1',
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    data: {
      title: 'List'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT + '/:' + ROUTING_PARENT + '1' + '/:' + ROUTING_PARENT + '2',
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    data: {
      title: 'List'
    }
  },
  {
    path: ':' + ROUTING_ELEMENT + '/:' + ROUTING_PARENT + '1' + '/:' + ROUTING_PARENT + '2' + '/:' + ROUTING_PARENT + '3',
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    data: {
      title: 'List'
    }
  }   
];
