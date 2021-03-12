import { Component, OnInit } from '@angular/core';
import * as albumData from '../data/SearchResultsAlbums.json';
import * as artistData from '../data/SearchResultsArtist.json';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums = albumData.albums.items;
  artist = (artistData as any).default;
  
  constructor() { }

  ngOnInit(): void {
  }

}
