import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private router = inject(Router)
  private userService = inject(UserService)

  username: string = "";
  password: string = "";
  error: string = "";
  admin:boolean = false;
  
  ngOnInit() : void{
    localStorage.clear()
    if(this.router.url.startsWith('/loginAdmin')){
      this.admin = true;
    }
  }

  login() {
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.userService.login(this.username, this.password, this.admin).subscribe(data => {
      if (data) {
        if(data.odobreno === "ne"){
          this.error = "Vas nalog je odbijen!"
          return 
        } 
        if(data.odobreno === "cekanje"){
          this.error = "Vas nalog jos uvek nije odobren!"
          return 
        }
        localStorage.setItem("ulogovan", JSON.stringify(data))
        if(this.admin)
          this.router.navigate(["admin"])
        else
          this.router.navigate([data.tip])
      } else {
        this.error = "Losi podaci!";
        return;
      }
    })
  }

  goToRegister(){
    this.router.navigate(['register'])
  }
}
