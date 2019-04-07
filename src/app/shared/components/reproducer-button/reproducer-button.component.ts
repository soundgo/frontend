import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reproducer-button',
  templateUrl: './reproducer-button.component.html',
  styleUrls: ['./reproducer-button.component.scss']
})
export class ReproducerButtonComponent implements OnInit {

  @Input() icon;
  @Input() activeIcon;
  @Input() color = '#0000000';
  @Input() size = '40';
  @Input() isActive = false;

  constructor() { }

  ngOnInit() {
  }

}
