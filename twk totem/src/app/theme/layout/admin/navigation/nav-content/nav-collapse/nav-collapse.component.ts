// Angular import
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { NavigationItem } from '../../navigation';

import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-nav-collapse',
  standalone: true,
  imports: [CommonModule, RouterModule, NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrl: './nav-collapse.component.scss'
})
export class NavCollapseComponent implements OnInit {
  private location = inject(Location);
  openedMenus: { [key: string]: boolean } = {};

  // public props
  @Input() item!: NavigationItem;
  windowWidth = window.innerWidth;
  current_url = ''; // Add current URL property

  ngOnInit() {
    this.current_url = this.location.path();

    // eslint-disable-next-line
    //@ts-ignore
    const baseHref = this.location['_baseHref'] || ''; // Use baseHref if necessary
    this.current_url = baseHref + this.current_url;

    // Timeout to allow DOM to fully render before checking for the links
    setTimeout(() => {
      const links = document.querySelectorAll('a.nav-link') as NodeListOf<HTMLAnchorElement>;
      links.forEach((link: HTMLAnchorElement) => {
        if (link.getAttribute('href') === this.current_url) {
          let parent = link.parentElement;
          while (parent && parent.classList) {
            if (parent.classList.contains('coded-hasmenu')) {
              parent.classList.add('coded-trigger');
              parent.classList.add('active');
            }
            parent = parent.parentElement;
          }
        }
      });
    }, 0);
  }

 toggleMenu(menuId: string) {
  console.log('toggleMenu:', menuId);
  this.openedMenus[menuId] = !this.openedMenus[menuId];
}

  navCollapse(e: MouseEvent) {
  let target = e.target as HTMLElement;

  // Se hai cliccato su uno <span> dentro al link, sali fino al .coded-hasmenu
  const menuItem = target.closest('.coded-hasmenu') as HTMLElement;

  if (!menuItem) return;

  const isOpen = menuItem.classList.contains('coded-trigger');

  // Se era aperto, chiudilo e basta
  if (isOpen) {
    menuItem.classList.remove('coded-trigger');
    return;
  }

  // Se era chiuso:
  // 1. NON chiudiamo le altre voci
  // 2. Apriamo i genitori se necessario

  // Aggiunge la classe all'elemento cliccato
  menuItem.classList.add('coded-trigger');

  // Apri i parent se sono .coded-hasmenu o .coded-submenu
  let ancestor = menuItem.parentElement;

  while (ancestor) {
    if (ancestor.classList.contains('coded-hasmenu') || ancestor.classList.contains('coded-submenu')) {
      ancestor.classList.add('coded-trigger');
    }
    ancestor = ancestor.parentElement;
  }
}

}

