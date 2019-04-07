import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {


    @Input() bg: string;
    @Input() icon: string;
    @Input() label: any;

    @HostBinding('style.border-color')
    width: string = this.bg;

    constructor() {
    }

    ngOnInit() {
    }

}
