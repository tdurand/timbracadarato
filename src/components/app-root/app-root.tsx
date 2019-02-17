import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  componentDidLoad() {
    // Todo catch audio
    // TODO see stencil doc + ionic doc for compoments
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <audio id="audio" src="http://www.soundjay.com/button/beep-07.wav" autostart="0" style={{"visibility": "hidden"}} ></audio>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
