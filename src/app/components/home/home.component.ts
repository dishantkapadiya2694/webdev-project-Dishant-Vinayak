import {Component, OnInit} from '@angular/core';
import {PocServiceClient} from "../../services/poc.service.client";
import {SharedService} from "../../services/shared.service";
import {UserService} from "../../services/user.service.client";
import {Router} from "@angular/router";
import {MovieServiceClient} from "../../services/movie.service.client";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    movies: any;
    title: string;
    searched: boolean;
    movies1: any;
    movies2: any;
    movies3: any;
    loggedIn = false;
    email: string;
    currentUser: any;

    constructor(private pocService: PocServiceClient, private sharedService: SharedService,
                private userService: UserService, private router: Router, private movieService: MovieServiceClient) {
    }

    ngOnInit() {
        this.userService.fetchCurrentUser()
            .subscribe((data) => {
                if (data) {
                    this.loggedIn = true;
                    this.email = this.sharedService.user['firstName'] || this.sharedService.user['email'];
                    this.currentUser = this.sharedService.user;
                }
            });
        console.log('User is ' + JSON.stringify(this.sharedService.user));
        this.findMostPopular();
        this.findHighestGrossing();
        this.findLatestRelease();
    }

    searchMovies() {
        this.pocService.findMovies(this.title)
            .subscribe(
                (data: any) => {
                    // console.log('Data here is ');
                    // console.log(data);
                    let val = data;
                    // console.log('Val is ' + JSON.stringify(val));
                    this.movies = val;
                    // console.log('Final movie list ' + JSON.stringify(this.movies));
                    this.searched = true;
                }
            );
    }

    findHighestGrossing() {
        this.pocService.findHighestGrossing()
            .subscribe(
                (data: any) => {
                    // console.log('Data here is ');
                    // console.log(data);
                    let val1 = data;
                    // console.log('Val is ' + JSON.stringify(val1));
                    this.movies1 = val1;
                    // console.log('Highest grossing are ' + JSON.stringify(this.movies1));
                }
            );
    }

    findMostPopular() {
        this.pocService.findMostPopular()
            .subscribe(
                (data: any) => {
                    // console.log('Data here is ');
                    // console.log(data);
                    let val2 = data;
                    // console.log('Val is ' + JSON.stringify(val2));
                    this.movies2 = val2;
                    // console.log('Most popular are ' + JSON.stringify(this.movies2));
                }
            );
    }

    findLatestRelease() {
        this.pocService.findLatestRelease()
            .subscribe(
                (data: any) => {
                    // console.log('Data here is ');
                    // console.log(data);
                    let val3 = data;
                    // console.log('Val is ' + JSON.stringify(val3));
                    this.movies3 = val3;
                    // console.log('Latest are ' + JSON.stringify(this.movies3));
                }
            );
    }

    logout() {
        this.userService.logout()
            .subscribe(
                (updatedUser) => {
                    location.reload(true);
                    this.router.navigate(['/home']);
                },
                (err) => {
                }
            );
    }

    createMovie(id: String, title: String) {
        let movie = {};
        movie['movieId'] = id;
        movie['title'] = title;
        console.log("Insdie create movie in home component");
        this.movieService.createMovie(movie)
            .subscribe((mov) => {
                    this.router.navigate(['movie', mov.movieId]);
                },
                (error) => {
                });
    }

}

