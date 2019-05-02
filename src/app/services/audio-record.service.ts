import {Injectable} from '@angular/core';
import * as Recorder from 'opus-recorder';
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
    private recordedTime = new BehaviorSubject<number>(0);
    private recordingFailedVal = new Subject<string>();

    constructor() {
    }

    getRecordedBlob(): any {
        return this.recorded.asObservable();
    }

    getRecordedTime() {
        return this.recordedTime;
    }

    recordingFailed(): Observable<string> {
        return this.recordingFailedVal.asObservable();
    }

    startRecording() {

        if (this.recorder) {
            // It means recording is already started or it is already recording something
            return;
        }

        navigator.mediaDevices.getUserMedia({audio: true}).then(s => {
            this.stream = s;
            this.record();
        }).catch(error => {
            this.recordingFailedVal.next();
        });

    }

    private record() {
        this.recorder = new Recorder({encoderPath: 'assets/encoderWorker.min.js'});
        this.recorder.start();
        this.startTime = moment();
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.recorder.onstart = () => {
            this.interval = setInterval(
                () => {
                    this.recordedTime.next(this.recordedTime.getValue() + 1);
                },
                1000
            );
        };
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
            this.recorder.onstop = data => {
                this.stopMedia();
            };
            this.recorder.ondataavailable = (typedArray) => {
                const blob = new Blob([typedArray], {type: 'audio/webm'});
                this.recorded.next({blob});
            };
            this.recorder.stop();
        }
    }

    private stopMedia() {
        if (this.recorder) {
            this.recorder = null;
            clearInterval(this.interval);
            this.startTime = null;
            this.recordedTime.next(0);
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
