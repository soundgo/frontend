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
    position = new BehaviorSubject<{latitude: number, longitude: number}>(null);

    constructor() {
    }

    getPosition() {
        return this.position;
    }

    startWatchPosition() {
        navigator.geolocation.watchPosition(({coords}) => {
            this.position.next(coords);
        }, null, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
        });
    }

    setCurrentLocation(entity) {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            this[entity + 'Entity'].next({
                ...this[entity + 'Entity'].getValue(),
                ...coords
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
