import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: Array<any> = [];
  private albumSub: any;

  constructor(
    private musicDataService: MusicDataService
  ) { 
  }

  ngOnInit(): void {
    this.albumSub = this.musicDataService.getNewReleases().subscribe((data)=>{
      this.releases = data.albums.items;
    })
  }

  ngOnDestroy():void{
    this.albumSub?.unsubscribe();
  }
}
