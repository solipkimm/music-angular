import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params)=>{
      this.searchQuery = params.get("q");
      this.musicDataService.searchArtists(this.searchQuery).subscribe((data)=>{
        this.results = data.artists.items.filter((artist)=>{
          return artist.images.length > 0;
        })
      })
    })
  }

}
