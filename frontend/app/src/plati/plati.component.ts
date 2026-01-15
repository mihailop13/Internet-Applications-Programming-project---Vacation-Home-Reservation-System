import { Component, inject } from '@angular/core';
import Rezervacija from '../models/rezervacija';
import User from '../models/user';
import Vikendica from '../models/vikendica';
import { FormsModule } from '@angular/forms';
import { RezervacijeService } from '../services/rezervacije.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-plati',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './plati.component.html',
  styleUrl: './plati.component.css'
})
export class PlatiComponent {

  private router = inject(Router)

  private rezervacijaService = inject(RezervacijeService)

  rezervacija : Rezervacija = new Rezervacija();

  turista : User = new User();

  vikendica : Vikendica = new Vikendica();

  card = ""

  ngOnInit() : void {
    let x = localStorage.getItem("rezervacija")
    if(x){
      this.rezervacija = JSON.parse(x);
    }
    let y = localStorage.getItem("vikendica")
    if(y){
      this.vikendica = JSON.parse(y)
    }
    this.rezervacija.vikendica = this.vikendica.id;
    let z = localStorage.getItem("ulogovan")
    if(z){
      this.turista = JSON.parse(z)
    }
    const datumDolaska = new Date(this.rezervacija.datumDolaska);
    const datumOdlaska = new Date(this.rezervacija.datumOdlaska);
    for (let d = new Date(datumDolaska); d.getTime() <= datumOdlaska.getTime(); d.setDate(d.getDate() + 1)) {
      if(d.getMonth() + 1 === 5 || d.getMonth() + 1 === 6 || d.getMonth() + 1 === 7 || d.getMonth() + 1 === 8){
        this.rezervacija.cena += this.vikendica.cenaLeto;
      } else {
        this.rezervacija.cena += this.vikendica.cenaZima;
      }
    }
    this.rezervacija.turista = this.turista.korisnickoIme
  }

  rezervisi(){
    this.rezervacija.datumRezervacije = new Date(Date.now()).toISOString();
    this.rezervacija.odobreno = "cekanje"
    localStorage.removeItem("vikendica")
    localStorage.removeItem("rezervacija")
    this.rezervacijaService.rezervisi(this.rezervacija).subscribe(data =>{
      if(data){
        alert("Poruka:\n\n" + data.message)
        this.router.navigate(['turista'])
      }
    })
  }

  checkCard(){
    const patternVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
    const patternMaster = /^5[1-5]\d{14}$/
    const patternDiners = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    if(patternMaster.test(this.turista.brojKreditneKartice))
      this.card = "assets/images/MasterCard-logo.png"
    else if(patternVisa.test(this.turista.brojKreditneKartice))
      this.card =  "assets/images/Visa-Logo.png"
    else if(patternDiners.test(this.turista.brojKreditneKartice))
      this.card =  "assets/images/Diners-logo.png"
  }
  
  changeDateFormat(datum : string) : string{
    return new Date(datum).toLocaleString()
  }

}
