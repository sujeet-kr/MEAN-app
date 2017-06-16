import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../validate.service';
import {AuthService} from '../auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
     name: this.name,
     email: this.email,
     username: this.username,
     password: this.password
    }

  //Required fields
  if (!this.validateService.validateRegister(user)){
    this.flashMessage.show("Please enter all fields", {cssClass: 'alert-danger', timeout: 5000});
    return false;
  }

  if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show("Please enter a valid email", {cssClass: 'alert-danger', timeout: 5000});
    return false;
  }

  //Register a user
  this.authService.registerUser(user).subscribe(data => {
    if(data.success){
      this.flashMessage.show("Congratulations! You are now registered", {cssClass: 'alert-success', timeout: 9000});
      this.router.navigate(['/login']);
    } else {
    this.flashMessage.show("Sorry! error occured", {cssClass: 'alert-danger', timeout: 5000});
    this.router.navigate(['/register']);
    }
  });

}
}
