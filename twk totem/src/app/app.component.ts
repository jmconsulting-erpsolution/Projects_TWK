import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SpinnerComponent],
  providers: []
})
export class AppComponent {

  constructor(
    private title: Title,
    private router: Router
  ) { }



  ngOnInit(): void {

    const company =
      this.capitalizeFirstLetter(environment.company);

    this.title.setTitle(company);
    this.setFavicon(this.setFromCompany('./assets/images/'));
  }

  private setFavicon(iconPath: string): void {
    if (!iconPath) return;

    // Rimuove favicon esistenti
    const existingIcons = document.querySelectorAll(
      "link[rel='icon'], link[rel='shortcut icon']"
    );
    existingIcons.forEach(el => el.remove());

    // Crea nuovo link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = iconPath + '?v=' + new Date().getTime(); // anti-cache

    document.head.appendChild(link);
  }

  setFromCompany(path: string): string {
    let logo = "";
    switch (environment.company) {
      case "TWINPACK":
        logo = path;
        logo += "twinpack.ico";
        break;
      case "TWINOVA":
        logo = path;
        logo += "twinova.ico";
        break;
      default:
        break;
    }
    return logo;
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
