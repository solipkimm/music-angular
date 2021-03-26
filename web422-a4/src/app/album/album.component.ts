import { Component, OnInit } from '@angular/core';
import * as data from '../data/SearchResultsAlbum.json';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  
  constructor(
    private musicDataService: MusicDataService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.musicDataService.getAlbumById(id).subscribe((data)=>{
      this.album = data;
    })

    if (this.musicDataService.addToFavourites(id)){
      this.snackBar.open(
        "Adding to Favourites...", 
        "Done", 
        { duration: 1500 }
      );
    }
  }
}
