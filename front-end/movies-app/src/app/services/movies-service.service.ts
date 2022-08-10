import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ILike } from './../models/likes.model';
import { IMovieData } from './../models/dataRes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_KEY = '95bcaa88b6f18e49bc9382a8ccf06a5f';
@Injectable({
  providedIn: 'root',
})
export class MoviesServiceService {
  constructor(private httpClient: HttpClient, private functions: AngularFireFunctions) {
  }
  getPopularMovies(): Observable<IMovieData> {
    return this.httpClient.get<IMovieData>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
    );
  }

  getNowPlayingMovies(): Observable<IMovieData> {
    return this.httpClient.get<IMovieData>(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`
    );
  }

  getUpcomingMovies(): Observable<IMovieData> {
    return this.httpClient.get<IMovieData>(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=1`
    );
  }

  getLikesMovies(): Observable<ILike[]> {
    return this.httpClient.get<ILike[]>(
      'http://localhost:5001/movies-votes-91b1f/us-central1/getLikes'
    );
  }

  addLike(movieID: number): void {
    const callable = this.functions.httpsCallable('addLike');
    callable({id: movieID}).subscribe((t) => {
      console.log(t);
    });
  }

  removeLike(movieID: number): void {
    const callable = this.functions.httpsCallable('removeLike');
    callable({id: movieID}).subscribe((t) => {
      console.log(t);
    });
  }
}
