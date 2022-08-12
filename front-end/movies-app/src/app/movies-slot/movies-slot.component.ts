import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

import { MoviesServiceService } from './../services/movies-service.service';
import { IMovie } from './../models/movies.model';
import { IMovieData } from './../models/dataRes.model';

import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { options } from './swiper_options';

@Component({
  selector: 'app-movies-slot',
  templateUrl: './movies-slot.component.html',
  styleUrls: ['./movies-slot.component.scss'],
})
export class MoviesSlotComponent implements OnInit {
  @Input() moviesTitle: string;
  @Input() moviesOBS: Observable<IMovieData>;
  @Input() likes: object;
  movies: IMovie[];

  faThumbsUp = faThumbsUp;
  faThumbsUpSolid = faThumbsUpSolid;

  imageURL = 'https://image.tmdb.org/t/p/original/';
  options = options;
  dataLoaded = false;

  constructor(private service: MoviesServiceService) {}
  ngOnInit(): void {
    this.populateMoviesAndLikes();
  }

  onClick($event: any) {
    const id = $event.currentTarget.dataset.internalid;
    const elements = document.getElementsByClassName(`.${id}`);
    let likedFirebase = false;
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      const likes = element.querySelector('ion-text');
      element.querySelectorAll('fa-icon').forEach((icon) => {
        if (!likedFirebase) {
          this.changeLikeButton(icon, id);
          likedFirebase = true;
        }
        icon.classList.toggle('disable');
      });
    }
  }

  changeLikeButton(icon: Element, id: number) {
    if (
      icon.classList.contains('regular') &&
      icon.classList.contains('disable')
    ) {
      this.service.removeLike(id);
      this.likes[id].likes -= 1;
    } else {
      this.service.addLike(id);
      this.likes[id].likes += 1;
    }
  }

  populateMoviesAndLikes() {
    this.moviesOBS.subscribe((val) => {
      this.movies = val.results;
      this.dataLoaded = true;
    });
  }
}
