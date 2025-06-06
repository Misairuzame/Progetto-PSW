import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from './music';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {

  private musicUrl: string;
  private homeUrl: string;

  constructor(private http: HttpClient) {
    this.musicUrl = "http://localhost:8080/music";
    this.homeUrl = "http://localhost:8080";
  }

  public getHomepage(): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    return this.http.get<string>(this.homeUrl, { headers: headers});
  }

  public getAllMusic(page: number): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    let params: HttpParams = new HttpParams()
                .set("page", page.toString());
    return this.http.get<string>(this.musicUrl, { headers: headers, params: params });
  }

  public getMusicById(id: number): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    return this.http.get<string>(this.musicUrl+"/"+id, {headers: headers});
  }

  public getMusicByParams(paramNames: string[], paramValues: string[], page: number): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    let params: HttpParams = new HttpParams();
    let i: number;
    for(i=0; i<paramValues.length; i++) {
      params = params.set(paramNames[i], paramValues[i]);
    }
    params = params.set("page", page.toString());

    return this.http.get<string>(this.musicUrl, {headers: headers, params: params});
  }

  public insertOneMusic(toAdd: Music): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    return this.http.post<string>(this.musicUrl, toAdd, {headers: headers});
  }

  public insertManyMusic(toAddArray: Music[]): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    let jsonBody = JSON.stringify(toAddArray);
    return this.http.put<string>(this.musicUrl, jsonBody, {headers: headers});
  }

  public updateOneMusic(toUpdate: Music): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    return this.http.put<string>(this.musicUrl+"/"+toUpdate.id, toUpdate, {headers: headers});
  }

  public deleteOneMusic(id: number): Observable<string> {
    let headers = new HttpHeaders()
                .set('Content-Type', 'application/json');
    return this.http.delete<string>(this.musicUrl+"/"+id, {headers: headers});
  }

}
