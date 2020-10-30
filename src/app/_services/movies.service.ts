import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Movie } from './../_models/movie';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {

  constructor(
    private router: Router,
    private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  }
}
