import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Error} from '../shared/models/Error';
import {Audio} from '../shared/models/Audio';
import {Ad} from '../shared/models/Ad';

@Injectable({
    providedIn: 'root',
})
export class ContextService {
    error = new BehaviorSubject<Error>(new Error());
    audioEntity = new BehaviorSubject<Audio>(new Audio());
    adEntity = new BehaviorSubject<Ad>(new Ad());
    map = new BehaviorSubject<any>(null);

    constructor() {
    }

    getCurrentLocation(): Promise<{ latitude: number, longitude: number }> {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                const {latitude, longitude} = coords;
                resolve({latitude, longitude});
            });
        });
    }

    setCurrentLocation(entity) {
        this.getCurrentLocation().then(position => {
            this[entity + 'Entity'].next({
                ...this[entity + 'Entity'],
                ...position
            });
        });
    }

    getMap() {
        return this.map;
    }

    setMap(map: any) {
        this.map.next(map);
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
