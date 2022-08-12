import { MoviesServiceService } from './../services/movies-service.service';
import { IMovieData } from './../models/dataRes.model';
import { Observable } from 'rxjs';
import { IMovie } from './../models/movies.model';
import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { bigOptions } from '../movies-slot/swiper_options';

@Component({
  selector: 'app-movies-big-slot',
  templateUrl: './movies-big-slot.component.html',
  styleUrls: ['./movies-big-slot.component.scss'],
})
export class MoviesBigSlotComponent implements OnInit {
  @Input() moviesTitle: string;
  @Input() moviesOBS: Observable<IMovieData>;
  @Input() likes: object;

  faThumbsUp = faThumbsUp;
  faThumbsUpSolid = faThumbsUpSolid;

  movies: IMovie[];
  imageURL = 'https://image.tmdb.org/t/p/original/';
  options = bigOptions;
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
      this.movies.forEach((movie) => {
        if (this.likes[movie.id]) {
          movie.likes = this.likes[movie.id].likes;
        }
      });
      this.dataLoaded = true;
    });
  }
}
