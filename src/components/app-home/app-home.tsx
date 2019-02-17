import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <p>
          Cada cuando quieres que timbre
        </p>
        <ion-input type="number" value="5"></ion-input>
        <ion-button href="/profile/ionic" expand="block">Start</ion-button>
      </ion-content>
    ];
  }
}
