import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {
    /**
     * Constructor
     */
    constructor() {
    }

    ngOnInit(): void {
    }
}
