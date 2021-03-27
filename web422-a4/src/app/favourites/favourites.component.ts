import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>
  private favSub: any;

  constructor(
    private musicDataService: MusicDataService,
  ) { }

  ngOnInit(): void {
    this.favSub = this.musicDataService.getFavourites().subscribe((data)=>{
      this.favourites = data.tracks;
    })
  }

  removeFromFavourites(id: any){
    this.musicDataService.removeFromFavourites(id).subscribe((data)=>{
      this.favourites = data.tracks;
    })
  }


  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
  }

}
