import { Component, OnInit } from '@angular/core';
import { MenuController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements ViewWillEnter {

  constructor(private menu: MenuController) {
  }
  ionViewWillEnter(): void {
    this.menu.enable(true, 'menuRight');
    this.menu.open('menuRight');
  }

}
