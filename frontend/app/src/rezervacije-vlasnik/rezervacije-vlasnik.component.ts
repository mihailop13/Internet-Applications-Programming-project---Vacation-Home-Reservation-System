import { Component, inject } from '@angular/core';
import User from '../models/user';
import { RezervacijeService } from '../services/rezervacije.service';
import Rezervacija from '../models/rezervacija';
import { VikendicaService } from '../services/vikendica.service';
import Vikendica from '../models/vikendica';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-rezervacije-vlasnik',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rezervacije-vlasnik.component.html',
  styleUrl: './rezervacije-vlasnik.component.css'
})
export class RezervacijeVlasnikComponent
 {

  vlasnik : User = new User()

  private rezervacijeService = inject(RezervacijeService)
  private vikendicaService = inject(VikendicaService)

  rezervacije : Rezervacija[] = []

  sveVikendice : Vikendica[] = []

  ngOnInit() : void{

    this.rezervacije = []
    this.sveVikendice = []
    let x = localStorage.getItem("ulogovan")
    if(x)
      this.vlasnik = JSON.parse(x)
    this.vikendicaService.getAllVikendice().subscribe(data =>{
      this.sveVikendice = data
    })
    this.rezervacijeService.dohvatiRezervacijeVlasnik(this.vlasnik.korisnickoIme).subscribe(data =>{
      if(data){
        for(const r of data)
          if(r.odobreno === "cekanje")
            this.rezervacije.push(r)
      }
    })
  }

  changeDateFormat(datum: string) : string{
    return new Date(datum).toLocaleString();
  }

  potvrdi(rezervacvija : Rezervacija){
    this.rezervacijeService.potvrdi(rezervacvija).subscribe(data => {alert(data.message); this.ngOnInit()})
  }

  odbij(rezervacvija : Rezervacija){
    if(rezervacvija.komentar === ""){
      alert("Greska:\n\nObavezno unesite komentar!")
      return
    }
    rezervacvija.odobreno = "ne"
    this.rezervacijeService.odbij(rezervacvija).subscribe(data =>{alert(data.message); this.ngOnInit()} )
  }

  komentarZa : number = -1
  unesiKomentar(id : number){
    this.komentarZa = id
  }

  getVikendicaById(id: number): Vikendica | undefined {
    return this.sveVikendice.find(v => v.id === id);
  }
}
