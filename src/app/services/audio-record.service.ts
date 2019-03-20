import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordService {

  private stream;
  private recorder;
  private interval;
  private startTime;
  private recorded = new Subject<any>();
  private recordingTime = new Subject<string>();
  private recordingFailedVal = new Subject<string>();

  constructor() { }

  getRecordedBlob(): any {
    return this.recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this.recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this.recordingFailedVal.asObservable();
  }

  startRecording() {

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this.recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.recordingFailedVal.next();
    });

  }

  private record() {

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm',
      // used by StereoAudioRecorder
      // the range 22050 to 96000.
      sampleRate: 44100,

      // used by StereoAudioRecorder
      // the range 22050 to 96000.
      // let us force 16khz recording:
      desiredSampRate: 16000,

      // used by StereoAudioRecorder
      // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
      bufferSize: 2048,

      // used by StereoAudioRecorder
      // 1 or 2
      numberOfAudioChannels: 1,

      // used by WebAssemblyRecorder
      frameRate: 30,

      // used by WebAssemblyRecorder
      bitrate: 128000
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
        () => {
          const currentTime = moment();
          const diffTime = moment.duration(currentTime.diff(this.startTime));
          const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
          this.recordingTime.next(time);
        },
        1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          this.recorded.next({ blob, title: mp3Name });
        }
      }, () => {
        this.stopMedia();
        this.recordingFailedVal.next();
      });
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }

  abortRecording() {
    this.stopMedia();
  }

}
