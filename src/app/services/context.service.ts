import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Error} from '../shared/models/Error';
import {Audio} from '../shared/models/Audio';
import {Ad} from '../shared/models/Ad';
import {User} from '../shared/models/User';
import {Actor} from '../shared/models/Actor';
import {Config} from '../shared/models/Config';
import {Site} from '../shared/models/Site';
import {CookieService} from 'ngx-cookie-service';

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
    isRecordingAudio = new BehaviorSubject<boolean>(false);
    isRecordingAd = new BehaviorSubject<boolean>(false);
    isRecorded = new BehaviorSubject<boolean>(false);
    isMarkerSiteVisible = new BehaviorSubject<boolean>(false);
    isMarkerAdVisible = new BehaviorSubject<boolean>(false);
    sendRecord = new BehaviorSubject<string>(null);
    recordType = new BehaviorSubject<string>(null);
    categoriesSelected = new BehaviorSubject<string>(
        'Tourism,Experience,Leisure'
    );
    tagsSelected = new BehaviorSubject<string[]>(null);
    sitesSelected = new BehaviorSubject<string[]>(null);
    siteId = new BehaviorSubject<number>(null);
    user = new BehaviorSubject<User>(null);
    config = new BehaviorSubject<Config>(new Config());

    auth = new BehaviorSubject<string>(null);

    isLocationEnabled = new BehaviorSubject<boolean>(false);
    deleteAdLocation = new BehaviorSubject<boolean>(false);

    loading = new BehaviorSubject<boolean>(false);

    constructor(private cookieService: CookieService) {
    }

    setLoading(loading: boolean) {
        this.loading.next(loading);
    }

    getLoading() {
        return this.loading;
    }

    getIsLocationEnabled() {
        return this.isLocationEnabled;
    }

    setIsLocationEnabled(value: boolean) {
        this.isLocationEnabled.next(value);
    }

    getDeleteAdLocation() {
        return this.deleteAdLocation;
    }

    setDeleteAdLocation(value: boolean) {
        this.deleteAdLocation.next(value);
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

    setUser(user: User) {
        this.cookieService.set('user', JSON.stringify({
            user,
            auth: this.getAuth().getValue()
        }));
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

    getTagsSelected() {
        return this.tagsSelected;
    }

    setTagsSelected(tagsSelected: string[]) {
        this.tagsSelected.next(tagsSelected);
    }

    getSendRecord() {
        return this.sendRecord;
    }

    setSendRecord(value: string) {
        this.sendRecord.next(value);
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

    getIsRecordingAudio(): Observable<boolean> {
        return this.isRecordingAudio.asObservable();
    }

    setIsRecordingAudio(value: boolean) {
        this.isRecordingAudio.next(value);
    }

    getIsRecordingAd(): Observable<boolean> {
        return this.isRecordingAd.asObservable();
    }

    setIsRecordingAd(value: boolean) {
        this.isRecordingAd.next(value);
    }

    getIsMarkerSiteVisible(): Observable<boolean> {
        return this.isMarkerSiteVisible.asObservable();
    }

    setIsMarkerSiteVisible(value: boolean) {
        this.isMarkerSiteVisible.next(value);
    }

    getIsMarkerAdVisible(): Observable<boolean> {
        return this.isMarkerAdVisible;
    }

    setIsMarkerAdVisible(value: boolean) {
        this.isMarkerAdVisible.next(value);
    }

    getPosition() {
        return this.position;
    }

    setPosition(coords) {
        this.position.next(coords);
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

    getAuth() {
        return this.auth;
    }

    setAuth(auth: string) {
        this.auth.next(auth);
    }

    getSiteEntity() {
        return this.siteEntity;
    }

    setSiteEntity(site: Site) {
        this.siteEntity.next(site);
    }
}
