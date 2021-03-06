import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class PocServiceClient {
  constructor(private _http: Http) {
  }

   baseUrl = environment.baseUrl;
     API_KEY = 'd3d04ee78153a24eeb1f7a0e73f56a9c';
     TMDB_URL = 'https://api.themoviedb.org/3';

  // findMovies(title: string) {
  //
  //     const url = this.TMDB_URL + '?api_key=' + this.API_KEY + '&query=' + title;
  //     return this._http.get(url);
  //
  // }

    findMovies(title: string) {
        console.log('baseUrl ' + this.baseUrl);
        return this._http.post(this.baseUrl + '/api/v1/search/movies', {query: title})
            .map(
                (res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    findHighestGrossing() {
        return this._http.get(this.baseUrl + '/api/v1/search/highestgrossing')
            .map(
                (res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    findMostPopular() {
        return this._http.get(this.baseUrl + '/api/v1/search/mostpopular')
            .map(
                (res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    findLatestRelease() {
        return this._http.get(this.baseUrl + '/api/v1/search/latestrelease')
            .map(
                (res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    findMovieById(movieId: string) {
        return this._http.get(this.TMDB_URL + '/movie/' + movieId + '?api_key=' + this.API_KEY + '&append_to_response=credits,reviews')
            .map(
                (res: Response) => {
                    const data = res.json();
                    // console.log('Data in POC is ' + JSON.stringify(data));
                    return data;
                }
            );
    }

    createMovie(movie: any) {}

}
