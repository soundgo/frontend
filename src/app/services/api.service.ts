import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, ObservableInput, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Audio} from '../shared/models/Audio';
import {Ad} from '../shared/models/Ad';
import {Category} from '../shared/models/Category';
import {Site} from '../shared/models/Site';
import {Error} from '../shared/models/Error';
import {ContextService} from './context.service';


const httpUserOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};

const httpAdvertiserOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = '';

    constructor(private http: HttpClient, private contextService: ContextService) {
    }

    ////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// AUDIO ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    /** GET: Give one audio with all its properties */
    getAudioById(id: number): Observable<Audio> {
        const url = `${this.apiUrl}/audio/${id}`;

        return this.http.get<Audio>(url).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** POST: Create an audio in the map */
    createAudio(audio: Audio): Observable<Audio> {
        const url = `${this.apiUrl}/audio`;

        return this.http.post<Audio>(url, audio.toJSON(), httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** PUT: Update an audio */
    updateAudio(audio: Audio): Observable<any> {
        const url = `${this.apiUrl}/audio/${audio.id}`;

        return this.http.put(url, audio.toJSON(), httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** DELETE: Delete an audio */
    deleteAudio(audio: Audio | number): Observable<Audio> {
        const id = typeof audio === 'number' ? audio : audio.id;
        const url = `${this.apiUrl}/audio/${id}`;

        return this.http.delete<Audio>(url, httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** GET: Give all audios of a site with all its properties */
    getSiteAudios(id: number): Observable<Audio[]> {
        const url = `${this.apiUrl}/audios/site/${id}`;

        return this.http.get<Audio[]>(url).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** POST: Create an audio in a site */
    createSiteAudio(audio: Audio, id: number): Observable<Audio> {
        const url = `${this.apiUrl}/audio/site/${id}`;

        return this.http.post<Audio>(url, audio.toJSON(), httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** GET: Find all reported audios */
    getReportedAudios(id: number): Observable<Audio[]> {
        const url = `${this.apiUrl}/audios/reported`;

        return this.http.get<Audio[]>(url).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////// ADVERTISEMENT (Ad) //////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    /** GET: Give one advertisement */
    getAdById(id: number): Observable<Ad> {
        const url = `${this.apiUrl}/advertisement/${id}`;

        return this.http.get<Ad>(url).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** POST: Create an advertisement in the map */
    createAd(ad: Ad): Observable<Ad> {
        const url = `${this.apiUrl}/advertisement`;

        return this.http.post<Ad>(url, ad.toJSON(), httpAdvertiserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** PUT: Update an advertisement and it is “deleted” */
    updateAd(ad: Ad): Observable<any> {
        const url = `${this.apiUrl}/advertisment/${ad.id}`;

        return this.http.put(url, ad.toJSON(), httpAdvertiserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /////////////////////////////////////////////////////////////////////////
    /////////////////////////// CATEGORY ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    /** PUT: Update the max time and min duration */
    updateCategory(cat: Category): Observable<any> {
        const url = `${this.apiUrl}/category/${cat.id}`;

        return this.http.put(url, cat.toJSON(), httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    //////////////////////////////////////////////////////////////////////
    /////////////////////////// SITE ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /** GET: Get a site */
    getSiteById(id: number): Observable<Site> {
        const url = `${this.apiUrl}/site/${id}`;

        return this.http.get<Site>(url).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** POST: Create a site */
    createSite(site: Site): Observable<Site> {
        const url = `${this.apiUrl}/advertisment/${site.id}`;

        return this.http.post<Site>(url, site.toJSON(), httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** PUT: Update a site */
    updateSite(site: Site): Observable<any> {
        const url = `${this.apiUrl}/site`;

        return this.http.put(url, site.toJSON(), httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }

    /** DELETE: Delete a site */
    deleteSite(site: Site | number): Observable<Site> {
        const id = typeof site === 'number' ? site : site.id;
        const url = `${this.apiUrl}/site/${site}`;

        return this.http.delete<Site>(url, httpUserOptions).pipe(
            catchError(err => this.handleError<any>(err))
        );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param response - api response
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(response: Error, result?: T) {
        console.log(response);
        this.contextService.setError(response);
        return of(result as T);
    }


}
