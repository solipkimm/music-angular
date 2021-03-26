import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: [];
  artist: any;
  artt: any;
  albb: any;
  rutt: any;
  
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
      this.albums = albumProperty.filter(function(album: {name: unknown}){
        return seen.has(album.name) ? false : seen.add(album.name);
      });
    });
  }

  ngOnDestroy(): void {}
}
