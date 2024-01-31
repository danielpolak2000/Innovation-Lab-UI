// random-video.component.ts
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-random-video',
  templateUrl: './random-video.component.html',
  styleUrls: ['./random-video.component.css']
})
export class RandomVideoComponent implements OnInit, OnDestroy {
  @Input() totalScore: number = 0;
  private videoElement: HTMLVideoElement | null = null;
  private introvertiertVideos: string[] = ['Langsam_auf_der_Autobahn.mp4', 'risikobereitschaft_intro.mp4', 'Musik_intro_neu.mp4' , 'ueberhohlen_intro.mp4', 'koop_intro.mp4' ];
  private extrovertiertVideos: string[] = ['Autobahn_rasen.mp4', 'langes_ueberhohlen.mp4', 'keine_koop.mp4', 'Musik_extro_neu.mp4', 'risikobereitschaft_extro.mp4' ];
  @Input() results: any[] = [];
  @Output() restartEvent = new EventEmitter();

  ngOnInit() {
    this.playVideo();
  }

  ngOnDestroy() {
    this.stopVideo();
  }

  playVideo() {
    const videoPath = this.getRandomVideoPath();
    this.videoElement = document.getElementById('randomVideo') as HTMLVideoElement;

    if (this.videoElement) {
      this.videoElement.src = videoPath;
      this.videoElement.load();
      

      // Add an event listener for the 'timeupdate' event
      this.videoElement.addEventListener('timeupdate', this.handleTimeUpdate.bind(this));
    }
  }

  handleTimeUpdate() {
    const videoElement = this.videoElement;

    // Check if the video is 1 second before the end
    if (videoElement && videoElement.duration - videoElement.currentTime < 1) {
      this.handleVideoEnded();
    }
  }

  handleVideoEnded() {
    console.log('Video is 1 second before the end');
    window.location.reload()
  }

  stopVideo() {
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.src = ''; // Reset the video source

      // Remove the 'timeupdate' event listener
      this.videoElement.removeEventListener('timeupdate', this.handleTimeUpdate.bind(this));
    }
  }

  private getRandomVideoPath(): string {
    this.totalScore = this.totalScore / 5;
    const videoDirectory = this.totalScore > 0.5 ? 'extrovertiert' : 'introvertiert';
    const videos = this.totalScore > 0.5 ? this.extrovertiertVideos : this.introvertiertVideos;

    if (videos && videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      return `assets/videos/${videoDirectory}/${videos[randomIndex]}`;
    } else {
      return 'assets/background.mp4';
    }
  }
}
