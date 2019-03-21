import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AudioRecordService} from './services/audio-record.service';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    duration = '0';
    audioBase64: any;
    subscription: Subscription;

    constructor(private sanitizer: DomSanitizer,
                private translate: TranslateService,
                private audioRecord: AudioRecordService) {
        translate.setDefaultLang('en');

        this.subscription = this.audioRecord.getRecordedTime().subscribe(value => {
            this.duration = value;
        });
    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

    startRecording() {
        this.audioRecord.startRecording();
    }

    async stopRecording() {
        this.audioRecord.stopRecording();
        this.audioRecord.getRecordedBlob().subscribe(({blob}) => {


            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const enc = new TextDecoder('utf-8');
                console.log(blob, reader.result);
                this.audioBase64 = this.sanitizer.bypassSecurityTrustResourceUrl('' + reader.result);
                // this.audioBase64 = enc.decode(new Uint8Array(reader.result)).split(',')[1];
            };
        });
    }


}
