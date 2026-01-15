import { Component, inject } from '@angular/core';
import Vikendica from '../models/vikendica';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import Rezervacija from '../models/rezervacija';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vikendica-info',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './vikendica-info.component.html',
  styleUrl: './vikendica-info.component.css'
})
export class VikendicaInfoComponent {

  pocetna = false

  vikendica : Vikendica = new Vikendica()

  imagesUrl: string = 'http://localhost:4000/vikendice/';

  imagesUrlFinal : string[] = []

  private userService = inject(UserService)

  private router = inject(Router)

  vlasnik : User = new User()

  rezervacija : boolean = false;

  turista : User = new User()

  mojaRezervacija : Rezervacija = new Rezervacija()

  ngOnInit() : void{
    let x = localStorage.getItem("vikendica");
    if (x != null) {
      this.vikendica= JSON.parse(x);
      for (let i = 0; i < this.vikendica.slike.length; i++) {
          this.imagesUrlFinal[i] = this.imagesUrl + this.vikendica.slike[i]
      }
    }
    x = localStorage.getItem("ulogovan")
    if (x != null) {
      this.turista = JSON.parse(x);
    }
    this.userService.getUser(this.vikendica.vlasnik).subscribe(data =>{
      if(data)
        this.vlasnik = data;
    });
  }
  
  rezervisi(){
    this.rezervacija = true;
  }

  plati(){
    if(this.mojaRezervacija.datumDolaska === "" || this.mojaRezervacija.datumOdlaska === "" ||
      (this.mojaRezervacija.brojDece === 0 && this.mojaRezervacija.brojOdraslih === 0)
    ){
      alert("Greska:\n\n" + "Niste uneli sve sto je potrebno!")
      return
    }
    const datumDolaska = new Date(this.mojaRezervacija.datumDolaska);
    const datumOdlaska = new Date(this.mojaRezervacija.datumOdlaska);
    if(datumDolaska.getHours() + 1 < 14){
      alert("Poruka:\n\n" +"U vikendicu nije moguce uci u vikendicu pre 14 casova!")
      return
    }
    if(datumOdlaska.getHours() + 1 > 10){
      alert("Poruka:\n\n" +"Iz vikendice morate izaci pre 10 casova!")
      return
    }
    if(datumDolaska.getTime() >= datumOdlaska.getTime() || datumDolaska.getTime() < new Date(Date.now()).getTime()){
      alert("Greska:\n\n" +"Neregularno izabrani datumi!")
      return
    }
    localStorage.setItem("rezervacija", JSON.stringify(this.mojaRezervacija))
    this.router.navigate(['placanje'])
  }

}
