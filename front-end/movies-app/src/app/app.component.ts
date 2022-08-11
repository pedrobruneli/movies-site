import { MoviesServiceService } from './services/movies-service.service';
import { Component, OnInit } from '@angular/core';
import { delay, retryWhen, take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  dataLoaded = false;
  likes = {};

  constructor(public service: MoviesServiceService) {
    this.tryConnect();
  }


  private tryConnect() {
    let tries = 0;
    try {
      const obs = this.service.getLikesMovies().pipe(
        retryWhen((errors) =>
          errors.pipe(
            delay(5000),
            take(5),
            tap(() => {
              if (tries === 4) {
                alert(
                  'Falha ao se conectar com o banco de dados, tente recarregar a pagina!'
                );
              }
              tries++;
            })
          )
        )
      );
      obs.subscribe((res) => {
        this.likes = res;
        this.dataLoaded = true;
      });
    } catch {
      alert('Err');
    }
  }
}
