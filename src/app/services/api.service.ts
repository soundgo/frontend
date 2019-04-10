import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, ObservableInput, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Audio} from '../shared/models/Audio';
import {Ad} from '../shared/models/Ad';
import {Category} from '../shared/models/Category';
import {Site} from '../shared/models/Site';
import {Error} from '../shared/models/Error';
import {ContextService} from './context.service';
import {CreditCard} from '../shared/models/CreditCard';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = 'https://soundgo-api-v2.herokuapp.com';

    constructor(private http: HttpClient, private context: ContextService) {
    }

    login(user: any) {
        const url = `${this.apiUrl}/api-token-auth/`;

        return new Promise(resolve => {
            this.http.post<any>(url, user.toJSON()).subscribe(response => resolve(response), err => resolve(err.error));
        });
    }

    adReproduced(id: number) {
        const url = `${this.apiUrl}/records/advertisement/listen/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: this.context.getUser().getValue() ? `Bearer ${this.context.getUser().getValue().token}` : ''
            })
        };

        return new Promise(resolve => {
            this.http.put<any>(url, {}, header).subscribe(response => resolve(response), err => this.handleError({
                error: 'There\'s been an unusual error',
                details: ''
            }));
        });
    }

    /** POST: Create an user */
    createUser(user: any) {
        const url = `${this.apiUrl}/accounts/actor/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, user.toJSON(), header).subscribe(response => resolve(response), (err) => this.handleError(err));
        });
    }

    ////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// AUDIO ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    audioReproduced(id: number) {
        const url = `${this.apiUrl}/records/audio/listen/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: this.context.getUser().getValue() ? `Bearer ${this.context.getUser().getValue().token}` : ''
            })
        };

        return new Promise(resolve => {
            this.http.put<any>(url, {}, header).subscribe(response => resolve(response), err => this.handleError({
                error: 'There\'s been an unusual error',
                details: ''
            }));
        });
    }


    /** GET: Give one audio with all its properties */
    getAudioById(id: number) {
        const url = `${this.apiUrl}/records/audio/${id}/`;
        return new Promise(resolve => {

            let header;
            if (this.context.getUser().getValue()) {
                header = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.context.getUser().getValue().token}`
                    })
                };
            }

            this.http.get<any>(url, header).subscribe((response: any) => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** POST: Create an audio in the map */
    createAudio(audio: Audio) {
        const url = `${this.apiUrl}/records/audio/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, audio.toJSON(), header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** PUT: Update an audio */
    updateAudio(audio: Audio) {
        const url = `${this.apiUrl}/records/audio/${audio.id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.put<any>(url, audio.toJSON ? audio.toJSON() : audio, header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, (err) => this.handleError(err));
        });
    }

    /** DELETE: Delete an audio */
    deleteAudio(audio: Audio | number) {
        const id = typeof audio === 'number' ? audio : audio.id;
        const url = `${this.apiUrl}/records/audio/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.delete<any>(url, header).subscribe(response => {
                resolve(response);
            }, (err) => this.handleError(err));
        });
    }

    /** GET: Give all audios of a site with all its properties */
    getSiteAudios(id: number) {
        const url = `${this.apiUrl}/records/audio/site/categories/${id}/?categories=${this.context.getCategoriesSelected().getValue()}`;

        return new Promise(resolve => {
            this.http.get<any>(url).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** POST: Create an audio in a site */
    createSiteAudio(audio: Audio, id: number) {
        const url = `${this.apiUrl}/records/audio/site/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, audio.toJSON(), header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** GET: Find all reported audios */
    getReportedAudios(id: number) {
        const url = `${this.apiUrl}/records/audios/reported/`;
        return new Promise(resolve => {
            this.http.get<any>(url).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** POST: like an audio  */
    likeAudio(audio: Audio) {
        const url = `${this.apiUrl}/records/audio/like/${audio.id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, null, header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** POST: report an audio */
    reportAudio(audio: Audio) {
        const url = `${this.apiUrl}/records/audio/report/${audio.id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, null, header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    ///////////////////////////////////////////////////////////////////////////////
    //////////////////////////// ADVERTISEMENT (Ad) //////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    /** GET: Give one advertisement */
    getAdById(id: number) {
        const url = `${this.apiUrl}/records/advertisement/${id}/`;
        return new Promise(resolve => {
            this.http.get<any>(url).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    getCreditCardById(id: number) {
        const url = `${this.apiUrl}/accounts/creditcard/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.get<any>(url, header).subscribe(response => resolve(response), err => this.handleError(err));
        });
    }

    /** POST: post an Credit carad */
    createCreditCard(creditCard: CreditCard) {
        const url = `${this.apiUrl}/accounts/creditcard/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, creditCard.toJSON(), header).subscribe(response => resolve(response), err => this.handleError(err));
        });
    }

    /** PUT: Update an creditcard and it is “deleted” */
    updateCreditCard(id: number, creditCard: CreditCard) {
        const url = `${this.apiUrl}/accounts/creditcard/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };
        return new Promise(resolve => {
            this.http.put<any>(url, creditCard.toJSON(), header).subscribe(response => resolve(response), err => this.handleError(err));
        });
    }

    /** POST: Create an advertisement in the map */
    createAd(ad: Ad) {
        const url = `${this.apiUrl}/records/advertisement/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, ad.toJSON(), header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** PUT: Update an advertisement and it is “deleted” */
    updateAd(ad: Ad) {
        const url = `${this.apiUrl}/records/advertisement/${ad.id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };
        return new Promise(resolve => {
            this.http.put<any>(url, ad, header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /////////////////////////////////////////////////////////////////////////
    /////////////////////////// CATEGORY ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    /** PUT: Update the max time and min duration */
    updateCategory(cat: Category) {
        const url = `${this.apiUrl}/category/${cat.id}/`;
        return new Promise(resolve => {
            this.http.put<any>(url, cat.toJSON()).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /////////////////////////////////////////////////////////////////////////
    ////////////////////////////// TAG /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    /** GET: Get all tags */
    getTags() {
        const url = `${this.apiUrl}/tags/`;
        return new Promise(resolve => {
            this.http.get<any>(url).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, (err) => this.handleError(err));
        });
    }

    //////////////////////////////////////////////////////////////////////
    /////////////////////////// SITE ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    /** GET: Get a site */
    getSiteById(id: number) {
        const url = `${this.apiUrl}/sites/site/${id}/`;
        return new Promise(resolve => {
            this.http.get<any>(url).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** POST: Create a site */
    createSite(site: Site) {
        const url = `${this.apiUrl}/sites/site/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.post<any>(url, site.toJSON(), header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** PUT: Update a site */
    updateSite(site: Site) {
        const url = `${this.apiUrl}/sites/site/${site.id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.put<any>(url, site.toJSON(), header).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    /** DELETE: Delete a site */
    deleteSite(site: Site | number) {
        const id = typeof site === 'number' ? site : site.id;
        const url = `${this.apiUrl}/sites/site/${id}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.getUser().getValue().token}`
            })
        };

        return new Promise(resolve => {
            this.http.delete<any>(url, header).subscribe(response => resolve(response),
                err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    getActorByName(name: string, token: string) {
        const url = `${this.apiUrl}/accounts/actor/${name}/`;

        const header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        };

        return new Promise(resolve => {
            this.http.get<any>(url, header).subscribe(response => resolve(response), err => this.handleError(err));
        });
    }

    getConfiguration() {
        const url = `${this.apiUrl}/configuration/`;
        return new Promise(resolve => {
            this.http.get<any>(url).subscribe(response => {
                if (response.error) {
                    this.handleError(response);
                }
                resolve(response);
            }, err => this.handleError({error: 'There\'s been an unusual error', details: ''}));
        });
    }

    handleError(response: any = {}) {
        this.context.setError(null);
        if (response.error) {
            this.context.setError(response.error);
        } else {
            this.context.setError({error: 'There\'s been an unusual error', details: ''});
        }
    }

}
