import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  auth: string;

  constructor(private context: ContextService) {
    this.user = this.context.getUser().getValue();
    this.auth = this.context.getAuth().getValue();
    console.log(this.user)
    console.log(this.auth)
    
  }

  ngOnInit() {
  }

}
