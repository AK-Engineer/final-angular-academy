import { MoviesService } from './../_services/movies.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../_models/movie';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  constructor(private moviesService: MoviesService) { }



  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

}
