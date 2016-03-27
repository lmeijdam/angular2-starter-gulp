import { Component, OnInit } from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: '/view/app.html',
})

export class AppComponent implements OnInit {
    title: string;
    
    constructor() { 
        this.title = "Hello from Angular 2";
    }

    ngOnInit() { }

}
