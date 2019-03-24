import {Component, OnInit, Input} from '@angular/core';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-number-reproductions-advertisements',
    templateUrl: './number-reproductions-advertisements.component.html',
    styleUrls: ['./number-reproductions-advertisements.component.sass']
})
export class NumberReproductionsAdvertisementsComponent implements OnInit {
    duration: number;
    ratio: number;
    maxToPay: number;

    maxNumberOfReproductions: number;

    constructor() {
    }

    ngOnInit() {
    }

    calculatePrice(): void {
        /**
         * The formula to calculate the price is:
         *  C x r x s x (d/10000)
         */
        this.duration = 30;
        this.ratio = 1000;
        this.maxNumberOfReproductions = this.maxToPay / (this.duration * (this.ratio / 10000));

    }

}
