// Angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {

  constructor(public appservice : AppService){}
 
  goToLogin(){
    this.appservice.loginDone = false;
    this.appservice.clearLocals();
    this.appservice.navigate("guest/login")
  }

}
