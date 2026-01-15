import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './promena-lozinke.component.html',
  styleUrl: './promena-lozinke.component.css'
})
export class PromenaLozinkeComponent {

  stara:string = ""
  nova:string = ""

  private userService = inject(UserService)
  private router = inject(Router)

  change() {
    if(this.stara === this.nova){
      alert("Greska:\n\n" + "Stara i nova lozinka se moraju razlikovati!")
      return
    }
    let x = localStorage.getItem("ulogovan");
    if (x != null) {
      let user= JSON.parse(x);
      this.userService.promeniLozinku(user.korisnickoIme, this.nova).subscribe(data =>{
        alert("Poruka:\n\n" + data.message)
        if(data && data.message !== "Pogrešan format lozinke!"){
          this.router.navigate(["login"])
        }
      })
    }
  }
}
