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

    private apiUrl = 'https://soundgo-api-v1.herokuapp.com';

    constructor(private http: HttpClient, private contextService: ContextService) {
    }

    ////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// AUDIO ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    /** GET: Give one audio with all its properties */
    getAudioById(id: number){
        const url = `${this.apiUrl}/records/audio/${id}/`;
        return new Promise(resolve => {
            this.http.get<Audio>(url).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** POST: Create an audio in the map */
    createAudio(audio: Audio) {
        const url = `${this.apiUrl}/records/audio/`;
        return new Promise(resolve => {
            this.http.post<Audio>(url, audio.toJSON(), httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** PUT: Update an audio */
    updateAudio(audio: Audio){
        const url = `${this.apiUrl}/records/audio/${audio.id}/`;
        return new Promise(resolve => {
            this.http.put<Audio>(url, audio.toJSON(), httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** DELETE: Delete an audio */
    deleteAudio(audio: Audio | number) {
        const id = typeof audio === 'number' ? audio : audio.id;
        const url = `${this.apiUrl}/records/audio/${id}/`;
        return new Promise(resolve => {
            this.http.delete<Audio>(url, httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** GET: Give all audios of a site with all its properties */
    getSiteAudios(id: number) {
        const url = `${this.apiUrl}/records/audios/site/${id}/`;
        return new Promise(resolve => {
            this.http.get<Audio>(url).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** POST: Create an audio in a site */
    createSiteAudio(audio: Audio, id: number) {
        const url = `${this.apiUrl}/records/audio/site/${id}/`;
        return new Promise(resolve => {
            this.http.post<Audio>(url, audio.toJSON(), httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** GET: Find all reported audios */
    getReportedAudios(id: number) {
        const url = `${this.apiUrl}/records/audios/reported/`;
        return new Promise(resolve => {
            this.http.get<Audio>(url).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////// ADVERTISEMENT (Ad) //////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    /** GET: Give one advertisement */
    getAdById(id: number) {
        const url = `${this.apiUrl}/records/advertisement/${id}/`;
        return new Promise(resolve => {
            this.http.get<Ad>(url).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** POST: Create an advertisement in the map */
    createAd(ad: Ad) {
        const url = `${this.apiUrl}/records/advertisement/`;
        return new Promise(resolve => {
            this.http.post<Ad>(url, ad.toJSON(), httpAdvertiserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** PUT: Update an advertisement and it is “deleted” */
    updateAd(ad: Ad) {
        const url = `${this.apiUrl}/records/advertisment/${ad.id}/`;
        return new Promise(resolve => {
            this.http.put<Ad>(url, ad.toJSON(), httpAdvertiserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /////////////////////////////////////////////////////////////////////////
    /////////////////////////// CATEGORY ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    /** PUT: Update the max time and min duration */
    updateCategory(cat: Category) {
        const url = `${this.apiUrl}/category/${cat.id}/`;
        return new Promise(resolve => {
            this.http.put<Category>(url, cat.toJSON(), httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    //////////////////////////////////////////////////////////////////////
    /////////////////////////// SITE ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /** GET: Get a site */
    getSiteById(id: number){
        const url = `${this.apiUrl}/sites/site/${id}/`;
        return new Promise(resolve => {
            this.http.get<Site>(url).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** POST: Create a site */
    createSite(site: Site) {
        const url = `${this.apiUrl}/sites/site/`;
        return new Promise(resolve => {
            this.http.post<Site>(url, site.toJSON(), httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** PUT: Update a site */
    updateSite(site: Site) {
        const url = `${this.apiUrl}/sites/site/${site.id}/`;
        return new Promise(resolve => {
            this.http.put<Site>(url, site.toJSON(), httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }

    /** DELETE: Delete a site */
    deleteSite(site: Site | number) {
        const id = typeof site === 'number' ? site : site.id;
        const url = `${this.apiUrl}/sites/site/${site}/`;
        return new Promise(resolve => {
            this.http.delete<Site>(url, httpUserOptions).subscribe(response => {
                resolve(response);
            }, err => this.handleError(err));
        });
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param response - api response
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(response: Error, result?: T) {
        this.contextService.setError(response);
    }


}
