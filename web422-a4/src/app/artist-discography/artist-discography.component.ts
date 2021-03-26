import { Component, OnInit } from '@angular/core';
import * as albumData from '../data/SearchResultsAlbums.json';
import * as artistData from '../data/SearchResultsArtist.json';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { sequence } from '@angular/animations';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: [];
  artist: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.musicDataService.getArtistById(id).subscribe((data)=>{
      this.artist = data;
    });
    this.musicDataService.getAlbumsByArtistId(id).subscribe((data)=>{
      let albumProperty = data.items;
      let seen = new Set();
      this.albums = albumProperty.filter(function(album){
        return seen.has(album) ? false : seen.add(album);
      });
    });
  }
}
