import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Error} from '../shared/models/Error';
import {Audio} from '../shared/models/Audio';
import {Ad} from '../shared/models/Ad';

@Injectable({
    providedIn: 'root'
})
export class ContextService {

    error = new BehaviorSubject<Error>(new Error());
    audioEntity = new BehaviorSubject<Audio>(new Audio());
    advertEntity = new BehaviorSubject<Audio>(new Audio());

    constructor() {
    }

    getError() {
        return this.error.asObservable();
    }

    getAudioEntity() {
        return this.audioEntity;
    }

    setAudioEntity(audio: Audio) {
        this.audioEntity.next(audio);
    }

    getAdEntity() {
        return this.audioEntity;
    }

    setAdEntity(ad: Ad) {
        this.audioEntity.next(ad);
    }

}
