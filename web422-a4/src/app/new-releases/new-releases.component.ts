import { Component, OnInit } from '@angular/core';
import * as data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases = [];
  private musicDataService: MusicDataService

  constructor() { 
  }

  ngOnInit(): void {
    this.musicDataService.getNewReleases().subscribe((data)=>{
      this.releases = data.albums.items;
    })
  }
}
