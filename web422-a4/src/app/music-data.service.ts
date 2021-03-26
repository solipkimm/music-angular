import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  private favouritesList: Array<any> = [];

  constructor(
    private spotifyToken: SpotifyTokenService, 
    private http: HttpClient
  ) { }  

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { 
        headers: { "Authorization": `Bearer ${token}` } 
      });
    }));
  }

  getArtistById(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { "Authorization": `Bearer ${token}` } 
      });
    }));
  }

  getAlbumsByArtistId(id: string): Observable<any> {
    let include_groups = "album,single";
    let limit = 50;
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: { "Authorization": `Bearer ${token}` } 
      });
    }));
  }

  getAlbumById(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { "Authorization": `Bearer ${token}` } 
      });
    }));
  }

  searchArtists(searchString: string): Observable<any> {
    let q = searchString;
    let type = "artist";
    let limit = 50;
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${q}&type=${type}&limit=${limit}`, {
        headers: { "Authorization": `Bearer ${token}` } 
      });
    }));
  }

  addToFavourites(id: string) {
    if (id && this.favouritesList.length < 50) {
      this.favouritesList.push(id);
      return true;
    } else {
      return false;
    }
  }

  removeFromFavourites(id: string) {
    this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    return this.getFavourites();
  }

  getFavourites() {
    if (this.favouritesList.length > 0){
      let ids = this.favouritesList.join(',');
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`, {
          headers: { "Authorization": `Bearer ${token}` } 
        });
      })); 
    } else {
      return new Observable(o=>{o.next([])});
    }
  }
}