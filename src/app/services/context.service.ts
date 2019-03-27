import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Error } from '../shared/models/Error';
import { Audio } from '../shared/models/Audio';
import { Ad } from '../shared/models/Ad';
import { User } from '../shared/models/User';
import { Actor } from '../shared/models/Actor';
import { Config } from '../shared/models/Config';
import { Site } from '../shared/models/Site';

@Injectable({
    providedIn: 'root',
})

export class ContextService {
    error = new BehaviorSubject<Error>(new Error());
    audioEntity = new BehaviorSubject<Audio>(new Audio());
    adEntity = new BehaviorSubject<Ad>(new Ad());
    siteEntity = new BehaviorSubject<Site>(new Site());
    map = new BehaviorSubject<any>(null);
    position = new BehaviorSubject<{ latitude: number; longitude: number }>(null);
    isRecording = new BehaviorSubject<boolean>(false);
    isRecorded = new BehaviorSubject<boolean>(false);
    isMarkerSiteVisible = new BehaviorSubject<boolean>(false);
    recordType = new BehaviorSubject<string>(null);
    categoriesSelected = new BehaviorSubject<string>(
        'Tourism,Experience,Leisure'
    );
    siteId = new BehaviorSubject<number>(null);
    user = new BehaviorSubject<Actor>(null);
    config = new BehaviorSubject<Config>(new Config());

    auth = 'null';

    constructor() {
    }

    getConfig() {
        return this.config;
    }

    setConfig(config: Config) {
        this.config.next(config);
    }

    getUser() {
        return this.user;
    }

    setUser(user: Actor) {
        this.user.next(user);
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

    getIsRecorded(): Observable<boolean> {
        return this.isRecorded.asObservable();
    }

    setIsRecorded(value: boolean) {
        this.isRecorded.next(value);
    }

    getIsRecording(): Observable<boolean> {
        return this.isRecording.asObservable();
    }

    setIsRecording(value: boolean) {
        this.isRecording.next(value);
    }

    getIsMarkerSiteVisible(): Observable<boolean> {
        return this.isMarkerSiteVisible.asObservable();
    }

    setIsMarkerSiteVisible(value: boolean) {
        this.isMarkerSiteVisible.next(value);
    }

    getPosition() {
        return this.position;
    }

    startWatchPosition() {
        navigator.geolocation.watchPosition(
            ({ coords }) => {
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
        navigator.geolocation.getCurrentPosition(({ coords }) => {
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

    getAuth() {
        return this.auth;
    }

    setAuth(auth: string) {
        this.auth = auth;
    }

    getSiteEntity() {
        return this.siteEntity;
    }

    setSiteEntity(site: Site) {
        this.siteEntity.next(site);
    }
}
