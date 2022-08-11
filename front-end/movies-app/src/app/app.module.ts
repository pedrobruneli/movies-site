import { MovieBannerComponent } from './movie-banner/movie-banner.component';
import { environment } from '../environments/environment';
import { RouteReuseStrategy } from '@angular/router';
import { MoviesSlotComponent } from './movies-slot/movies-slot.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesSlotComponent,
    MovieBannerComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    SwiperModule
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase,
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: ['localhost', 5001],
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: ['localhost', 8080],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
