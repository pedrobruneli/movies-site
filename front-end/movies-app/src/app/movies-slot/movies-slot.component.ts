import { MoviesServiceService } from './../services/movies-service.service';

import { IMovie } from './../models/movies.model';
import { IMovieData } from './../models/dataRes.model';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { ViewWillEnter } from '@ionic/angular';

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
  options = {
    slidesPerView: 8.5,
    speed: 400,
    loop: true,
    spaceBetween: 10,
    breakpoints: {
      0: {
        slidesPerView: 2.5,
      },
      550: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 7,
      },
      1400: {
        slidesPerView: 8.5,
      },
    },
  };

  constructor(private service: MoviesServiceService) {}
  ngOnInit(): void {
    this.moviesOBS.subscribe((val) => {
      this.movies = val.results;
      this.movies.forEach((movie) => {
        if (this.likes[movie.id]) {
          movie.likes = this.likes[movie.id].likes;
        }
      });
    });
  }

  onClick($event) {
    const id = $event.currentTarget.id;
    const elements = document.getElementsByClassName(`.${id}`);
    let liked = false;
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      const likes = element.querySelector('ion-text');
      element.querySelectorAll('fa-icon').forEach((icon) => {
        console.log('icone');
        if (!liked) {
          liked = true;
          if (
            icon.classList.contains('regular') &&
            icon.classList.contains('disable')
          ) {
            this.service.removeLike(id);
            likes.textContent =
              Number(likes.textContent.split(' Likes')[0]) - 1 + ' Likes';
          } else {
            this.service.addLike(id);
            likes.textContent =
              Number(likes.textContent.split(' Likes')[0]) + 1 + ' Likes';
          }
        }
        icon.classList.toggle('disable');
      });
    }
  }
}
