import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-reproduccer',
    templateUrl: './reproduccer.component.html',
    styleUrls: ['./reproduccer.component.sass']
})
export class ReproduccerComponent implements OnInit {

    @Input() audioSrc: string;

    constructor() {
    }

    ngOnInit() {
    }

}
