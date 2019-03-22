import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Error} from '../shared/models/Error';
import {Audio} from '../shared/models/Audio';
import {Ad} from '../shared/models/Ad';

@Injectable({
    providedIn: 'root'
})
export class ContextService {

    error = new BehaviorSubject<Error>(new Error());
    audioEntity = new BehaviorSubject<Audio>(new Audio());
    adEntity = new BehaviorSubject<Ad>(new Ad());

    constructor() {
    }

    getError(): Observable<Error> {
        return this.error.asObservable();
    }

    setError(error: Error) {
        return this.error.next(error);
    }

    getAudioEntity() {
        return this.audioEntity;
    }

    setAudioEntity(audio: Audio) {
        this.audioEntity.next(audio);
    }

    getAdEntity() {
        return this.adEntity;
    }

    setAdEntity(ad: Ad) {
        this.adEntity.next(ad);
    }

}
