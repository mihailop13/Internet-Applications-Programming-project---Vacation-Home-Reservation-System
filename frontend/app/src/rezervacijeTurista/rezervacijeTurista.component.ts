import { Component, inject } from '@angular/core';
import User from '../models/user';
import Rezervacija from '../models/rezervacija';
import { RezervacijeService } from '../services/rezervacije.service';
import { FormsModule } from '@angular/forms';
import { VikendicaService } from '../services/vikendica.service';
import Vikendica from '../models/vikendica';

@Component({
  selector: 'app-rezervacije',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rezervacijeTurista.component.html',
  styleUrl: './rezervacijeTurista.component.css'
})
export class RezervacijeTuristaComponent {

  turista : User = new User()

  sveVikendice : Vikendica[] = []
  zavrseneRezervacije : Rezervacija[] = []
  aktuelneRezervacije : Rezervacija[] = []

  private rezevacijeService = inject(RezervacijeService)
  private vikendicaService = inject(VikendicaService)

  ngOnInit() : void{
    this.sveVikendice = []
    this.zavrseneRezervacije = []
    this.aktuelneRezervacije = []
    let x = localStorage.getItem("ulogovan")
    if(x){
      this.turista = JSON.parse(x)
    }
    this.vikendicaService.getAllVikendice().subscribe(data =>{
      this.sveVikendice = data
    })
    this.rezevacijeService.dohvatiRezervacijeTurista(this.turista.korisnickoIme).subscribe(data =>{
      if(data){
        for(const r of data){
          if(new Date(r.datumOdlaska).getTime() <= Date.now())
            this.zavrseneRezervacije.push(r)
          else 
            this.aktuelneRezervacije.push(r)
        }
        this.zavrseneRezervacije.sort((a,b) =>{
          return new Date(a.datumOdlaska).getTime() - new Date(b.datumOdlaska).getTime()
        })
        this.aktuelneRezervacije.sort((a,b) =>{
          return new Date(a.datumOdlaska).getTime() - new Date(b.datumOdlaska).getTime()
        })
      }
    })
  }

  changeDateFormat(datum: string) : string{
    return new Date(datum).toLocaleString();
  }

  ocenjivanje = false;
  rezervacijaZaOcenu : Rezervacija = new Rezervacija()

  oceni(rezervacija : Rezervacija){
    this.ocenjivanje = true;
    this.rezervacijaZaOcenu = Object.assign(this.rezervacijaZaOcenu, rezervacija);
  }

  ocena = 0
  potvrdiOcenu(){
    this.rezervacijaZaOcenu.ocena = Number(this.ocena);
    this.rezevacijeService.oceni(this.rezervacijaZaOcenu).subscribe(data =>{
      if(data)
        alert("Poruka:\n\n" +data.message);
      this.ocenjivanje = false
      this.rezervacijaZaOcenu = new Rezervacija()
      this.ngOnInit()
    })
  }

  otkazi(rezervacija : Rezervacija){
    this.rezevacijeService.otkazi(rezervacija).subscribe(data => {
      if(data)
        alert("Poruka:\n\n" + data.message)
      this.aktuelneRezervacije = []
      this.zavrseneRezervacije = []
      this.ngOnInit()
    })
  }

  dosaoDanPre(rezervacija : Rezervacija) : boolean{
    const datumDolaska = new Date(rezervacija.datumDolaska).getTime()
    if(datumDolaska >= Date.now() + 24*60*60*1000){ return true; }
    return false;
  }

  getVikendicaById(id: number): Vikendica | undefined {
    return this.sveVikendice.find(v => v.id === id);
  }

}
