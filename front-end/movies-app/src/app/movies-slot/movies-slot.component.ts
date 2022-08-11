import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

import { MoviesServiceService } from './../services/movies-service.service';
import { IMovie } from './../models/movies.model';
import { IMovieData } from './../models/dataRes.model';

import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { options } from './swiper_options';
import {  movies } from 'src/environments/environment';

@Component({
  selector: 'app-movies-slot',
  templateUrl: './movies-slot.component.html',
  styleUrls: ['./movies-slot.component.scss'],
})
export class MoviesSlotComponent implements OnInit {
  @Input() moviesTitle: string;
  @Input() moviesOBS: Observable<IMovieData>;
  @Input() likes: object;

  faThumbsUp = faThumbsUp;
  faThumbsUpSolid = faThumbsUpSolid;

  movies: IMovie[];
  imageURL = 'https://image.tmdb.org/t/p/original/';
  options = options;

  constructor(private service: MoviesServiceService) {}
  ngOnInit(): void {
    this.populateMoviesAndLikes();
  }

  onClick($event: any) {
    const id = $event.currentTarget.id;
    const elements = document.getElementsByClassName(`.${id}`);
    let liked = false;
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      const likes = element.querySelector('ion-text');
      element.querySelectorAll('fa-icon').forEach((icon) => {
        if (!liked) {
          liked = true;
          this.changeLikeButtonAndText(icon, likes, id);
        }
        icon.classList.toggle('disable');
      });
    }
  }

  changeLikeButtonAndText(
    icon: Element,
    likes: HTMLIonTextElement,
    id: number
  ) {
    const likesValue = Number(likes.textContent.split(' Likes')[0]);
    if (
      icon.classList.contains('regular') &&
      icon.classList.contains('disable')
    ) {
      this.service.removeLike(id);
      likes.textContent = likesValue - 1 + ' Likes';
    } else {
      this.service.addLike(id);
      likes.textContent = likesValue + 1 + ' Likes';
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
    });
  }
}
