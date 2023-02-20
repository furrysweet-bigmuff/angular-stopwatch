import { Component } from '@angular/core';
import { interval, timer, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public minutesSeconds = '00:00';
  public intervalSubscription: Subscription | null = null;
  private intervallTimer: Observable<number> = interval(1000);
  private clickTimer: Observable<number> | null = null;
  private timerSubscription: Subscription | null = null;
  private count:number = 0;

  stopInterval() {
    this.intervalSubscription!.unsubscribe();
    this.intervalSubscription = null;
  }

  onToggle() {
    // if interval is stopped - turn it on
    if (!this.intervalSubscription) {
      this.runTimer()
    } else {
      // if interval is active - stop it
      this.stopInterval()
      this.count = 0;
      this.minutesSeconds = '00:00';
    }
  }

  onWait() {
    // if interval wasn't started before - don't run onWait
    if (!this.intervalSubscription) {
      return
    }

    // if timer is active (if this is second click at button in 500 milliseconds gap) - pause interval
    if(this.timerSubscription != null) {
      this.timerSubscription.unsubscribe();
      this.stopInterval()
    }

    // if this is a first click at button - start 500 milliseconds timer
    this.clickTimer = timer(500);
    this.timerSubscription = this.clickTimer.subscribe(() => {
      this.timerSubscription = null;
    })
  }

  onReset() {
    // if interval is active - stop it
    if (this.intervalSubscription) {
      this.stopInterval()
    }
    // reset
    this.count = 0;
    this.minutesSeconds = '00:00';
    this.runTimer()
    
  }
  
  // activate timer (count seconds)
  runTimer() {
    this.intervalSubscription = this.intervallTimer.subscribe(() => {
      this.formateTime(this.count += 1)
    })
  }

  // formate seconds to MM:SS output
  formateTime(num: number) {
    let minutes: (number | string) = Math.floor(num / 60);
    let seconds: (number | string) = Math.floor(num % 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    this.minutesSeconds = `${minutes}:${seconds}`
  }

}
