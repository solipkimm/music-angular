import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { AlbumComponent } from './album/album.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: "newReleases", component: NewReleasesComponent},
  { path: "artist/:id", component: ArtistDiscographyComponent },
  { path: "album/:id", component: AlbumComponent },
  { path: "about", component: AboutComponent },
  { path: "", redirectTo: '/newReleases', pathMatch: 'full' },
  { path: "**", component: NotFoundComponent },
  { path: "search", component: SearchResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
