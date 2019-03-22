import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Audio } from '../shared/models/Audio';
import { Ad } from '../shared/models/Ad';
import { Category } from '../shared/models/Category';
import { Site } from '../shared/models/Site';
import { Error } from '../shared/models/Error';
import { ContextService } from './context.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'Authorization': 'my-auth-token' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = '';  // URL to web api

  constructor(private http: HttpClient, private contextService:ContextService) { }

  ////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// AUDIO ///////////////////////////////
  //////////////////////////////////////////////////////////////////////
  
  /** GET: Give one audio with all its properties */
  getAudioByID(id:number):Observable<Audio>{
    const url = `${this.apiUrl}/audio/${id}`;

    return this.http.get<Audio>(url).pipe(
      catchError(this.handleError<Audio>(`getAudioById id=${id}`))
    );
  }
  
  /** POST: Create an audio in the map */
  createAudio(audio:Audio):Observable<Audio>{
    const url = `${this.apiUrl}/audio`;

    return this.http.post<Audio>(url, audio, httpOptions).pipe(
      catchError(this.handleError<Audio>('createAudio'))
    );
  }

  /** PUT: Update an audio */
  updateAudio(audio:Audio):Observable<any>{
    const url = `${this.apiUrl}/audio/${audio.id}`;

    return this.http.put(url, audio, httpOptions).pipe(
      catchError(this.handleError<any>('updateAudio'))
    );
  }

  /** DELETE: Delete an audio */
  deleteAudio(audio:Audio | number):Observable<Audio>{
    const id = typeof audio === 'number' ? audio : audio.id;
    const url = `${this.apiUrl}/audio/${id}`;

    return this.http.delete<Audio>(url, httpOptions).pipe(
      catchError(this.handleError<Audio>('deleteAudio'))
    );
  }

  /** GET: Give all audios of a site with all its properties */
  getAudiosOfSite(id:number):Observable<Audio[]>{
    const url = `${this.apiUrl}/audios/site/${id}`;

    return this.http.get<Audio[]>(url)
      .pipe(
        catchError(this.handleError<Audio[]>('getAudiosOfSite', []))
      );
  }

  /** POST: Create an audio in a site */
  createAudioInSite(audio:Audio, id:number):Observable<Audio>{
    const url = `${this.apiUrl}/audio/site/${id}`;

    return this.http.post<Audio>(url, audio, httpOptions).pipe(
      catchError(this.handleError<Audio>('createAudioInSite'))
    );
  }

  /** GET: Give all audios deactivated */
  getAudiosDeactivated(id:number):Observable<Audio[]>{
    const url = `${this.apiUrl}/audios/reported`;

    return this.http.get<Audio[]>(url)
      .pipe(
        catchError(this.handleError<Audio[]>('getAudiosDeactivated', []))
      );
  }

  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////// ADVERTISEMENT (Ad) //////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  /** GET: Give one advertisement */
  getAdvertisementByID(id:number):Observable<Ad>{
    const url = `${this.apiUrl}/advertisement/${id}`;

    return this.http.get<Ad>(url).pipe(
      catchError(this.handleError<Ad>(`getAdvertisementById id=${id}`))
    );
  }

  /** POST: Create an advertisement in the map */
  createAdvertisement(ad:Ad):Observable<Ad>{
    const url = `${this.apiUrl}/advertisement`;

    return this.http.post<Ad>(url, ad, httpOptions).pipe(
      catchError(this.handleError<Ad>('createAdvertisement'))
    );
  }

  /** PUT: Update an advertisement and it is “deleted” */
  updateAdvertisement(ad:Ad):Observable<any>{
    const url = `${this.apiUrl}/advertisment/${ad.id}`;

    return this.http.put(url, ad, httpOptions).pipe(
      catchError(this.handleError<any>('updateAdvertisement'))
    );
  }

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////// CATEGORY ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  /** PUT: Update the max time and min duration */
  updateCategory(cat:Category):Observable<any>{
    const url = `${this.apiUrl}/category/${cat.id}`;

    return this.http.put(url, cat, httpOptions).pipe(
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  //////////////////////////////////////////////////////////////////////
  /////////////////////////// SITE ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  /** GET: Get a site */
  getSiteByID(id:number):Observable<Site>{
    const url = `${this.apiUrl}/site/${id}`;

    return this.http.get<Site>(url).pipe(
      catchError(this.handleError<Site>(`getSiteById id=${id}`))
    );
  }

  /** POST: Create a site */
  createSite(site:Site):Observable<Site>{
    const url = `${this.apiUrl}/advertisment/${site.id}`;

    return this.http.post<Site>(url, site, httpOptions).pipe(
      catchError(this.handleError<Site>('createSite'))
    );
  }

  /** PUT: Update a site */
  updateSite(site:Site):Observable<any>{
    const url = `${this.apiUrl}/site`;

    return this.http.put(url, site, httpOptions).pipe(
      catchError(this.handleError<any>('updateSite'))
    );
  }

  /** DELETE: Delete a site */
  deleteSite(site:Site | number):Observable<Site>{
    const id = typeof site === 'number' ? site : site.id;
    const url = `${this.apiUrl}/site/${site}`;

    return this.http.delete<Site>(url, httpOptions).pipe(
      catchError(this.handleError<Site>('deleteSite'))
    );
  }




  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // transforming error for user consumption
      error = new Error(operation);
        
      this.contextService.setError(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
