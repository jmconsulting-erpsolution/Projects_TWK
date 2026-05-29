// Angular import
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-logo',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent {
  // public props
  // @Input() navCollapsed: boolean;
  @Output() NavCollapse = new EventEmitter();
  windowWidth = window.innerWidth;

  // public import
  navCollapse() {
    if (this.windowWidth >= 1025) {
      // this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  setLogo(path: string): string {
          let logo = "";
          switch (environment.company) {
              case "TWINPACK SPA":
                  logo = path;
                  logo += "twinpack.png";
                  break;
              case "TWINOVA":
                  logo = path;
                  logo += "twinova.png";
                  break;
              default:
                  break;
          }
          return logo;
      }
}
