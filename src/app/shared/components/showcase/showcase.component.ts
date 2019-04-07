import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {


    @Input() bg: string;
    @Input() icon: string;
    @Input() label: any;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }

}
