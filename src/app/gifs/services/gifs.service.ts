import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})

// https://developers.giphy.com/
export class GifsService {

  public gifList: Gif[] = [];

  private apiKey:       string = 'QtbOhVObiPQviHrRgUtIgmo4C8ayDM07';
  private _tagsHistory: string [] = [];
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagHistory() {
    return [ ...this._tagsHistory ];
  }

  organizeTags( tag: string ):void {
    const newTag = tag.toLowerCase();
    const tamanioMaximoHistorial = 10;
    this._tagsHistory = this._tagsHistory.filter( tagSearch => tagSearch !== newTag );
    this._tagsHistory.unshift( newTag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    /* if( this._tagsHistory.length > tamanioMaximoHistorial){
      this._tagsHistory.pop();
    } */
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if( this._tagsHistory.length === 0 ) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag: string):void {
    if ( tag.length === 0 ) return;
    this.organizeTags( tag );

    const params  = new HttpParams ()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
     .subscribe( response => {
        this.gifList = response.data;
        console.log({gifs : this.gifList});
     });
  }

}
