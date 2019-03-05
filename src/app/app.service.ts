import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/catch';

@Injectable()
export class appService {
    private apiUrl: string = environment.apiUrl;
    private apiKey: string = environment.apiKey;

    constructor(
        private http: HttpClient
    ) { }

    getPwnedCount(password: string): Observable<any> {
        return this.http.get(`${this.apiUrl}${password}?api_key=${this.apiKey}`, { responseType: 'text' });
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
} 