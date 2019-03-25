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
    position = new BehaviorSubject<{ latitude: number; longitude: number }>(null);
    isRecording = new BehaviorSubject<boolean>(false);
    isAudioRecorded = new BehaviorSubject<boolean>(false);
    recordType = new BehaviorSubject<string>(null);
    categoriesSelected = new BehaviorSubject<string>('Tourism,Experience,Leisure');
    siteId = new BehaviorSubject<number>(null);

    constructor() {
    }

    getSiteId() {
        return this.siteId;
    }

    setSiteId(siteId: number) {
        this.siteId.next(siteId);
    }

    getCategoriesSelected() {
        return this.categoriesSelected;
    }

    setCategoriesSelected(categoriesSelected: string) {
        this.categoriesSelected.next(categoriesSelected);
    }

    getRecordType() {
        return this.recordType;
    }

    setRecordType(recordType: string) {
        this.recordType.next(recordType);
    }

    getIsAudioRecorded(): Observable<boolean> {
        return this.isAudioRecorded.asObservable();
    }

    setIsAudioRecorded(value: boolean) {
        this.isAudioRecorded.next(value);
    }

    getIsRecording(): Observable<boolean> {
        return this.isRecording.asObservable();
    }

    setIsRecording(value: boolean) {
        this.isRecording.next(value);
    }

    getPosition() {
        return this.position;
    }

    startWatchPosition() {
        navigator.geolocation.watchPosition(
            ({coords}) => {
                this.position.next(coords);
            },
            null,
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }

    setCurrentLocation(entity) {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            this[entity + 'Entity'].next({
                ...this[entity + 'Entity'].getValue(),
                ...coords,
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

    setAudioEntity(audio: any) {
        this.audioEntity.next(audio);
    }

    getAdEntity() {
        return this.adEntity;
    }

    setAdEntity(ad: Ad) {
        this.adEntity.next(ad);
    }
}
