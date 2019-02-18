import { Component, State } from '@stencil/core';
import dayjs, { Dayjs } from 'dayjs';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  oneSecondInterval: number;
  audio: HTMLAudioElement;

  @State() currentTime: Dayjs;
  @State() targetTime: Dayjs;
  @State() intervalDuration = 1;


  changeIntervalDuration(event) {
    this.intervalDuration = parseInt(event.target.value, 10);
  }
  
  startTimer() {
    this.audio.play();
    this.audio.pause();

    let now = new Date();
    this.targetTime = dayjs(now).add(this.intervalDuration, 'm');
    this.currentTime = dayjs(now);
    this.oneSecondInterval = window.setInterval(() => {
      this.currentTime = dayjs();
    }, 100);
  }

  stopTimer() {
    this.targetTime = null;
    this.audio.pause();
    if(this.oneSecondInterval) {
      window.clearInterval(this.oneSecondInterval);
    }
  }

  componentWillUpdate() {
    if(this.targetTime.diff(this.currentTime, 's') <= 0) {
      this.targetTime = dayjs(new Date()).add(this.intervalDuration, 'm');
      console.log('play sound');
      this.audio.play();
    }
  }

  componentDidLoad() {
    this.audio = new Audio("/assets/siren_noise.mp3");
    // this.audio.play();
    // Todo catch audio
    // TODO see stencil doc + ionic doc for compoments
  }

  componentDidUnload() {
    this.stopTimer();
  }

  // Format in mm:ss
  formatDuration(durationInSeconds) {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = durationInSeconds - minutes * 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Timbra cada rato</ion-title>
          </ion-toolbar>
        </ion-header>
        {!this.targetTime &&
          [
            <ion-item class="form">
              <ion-label position="floating">Cada cuantos minutos ?</ion-label>
              <ion-input 
                onInput={(event) => this.changeIntervalDuration(event)} 
                type="number" 
                value={this.intervalDuration.toString()}
                inputmode="numeric" 
                pattern="[0-9]*" 
                required>
              </ion-input>
            </ion-item>,
            <ion-button
              expand="block"
              size="large"
              onClick={() => this.startTimer()}
            >
              Iniciar
            </ion-button>
          ]
        }
        {this.targetTime && 
          [
            <div class="time-remaining">{this.formatDuration(this.targetTime.diff(this.currentTime, 's'))}</div>,
            <ion-button
              expand="block"
              color="danger"
              size="large"
              onClick={() => this.stopTimer()}
            >
              Stop
            </ion-button>
          ]
        }
      </ion-app>
    );
  }
}
