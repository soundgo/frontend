import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  @Input() bg: string;
  @Input() icon: string;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
