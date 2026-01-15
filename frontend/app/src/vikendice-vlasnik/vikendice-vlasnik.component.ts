import { Component, inject } from '@angular/core';
import { VikendicaService } from '../services/vikendica.service';
import Vikendica from '../models/vikendica';
import User from '../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vikendice-vlasnik',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vikendice-vlasnik.component.html',
  styleUrl: './vikendice-vlasnik.component.css'
})
export class VikendiceVlasnikComponent {
  
  private vikendicaService = inject(VikendicaService)

  mojeVikendice : Vikendica[] = []

  vlasnik : User = new User()

  ngOnInit() : void{
    this.mojeVikendice = []
    let x = localStorage.getItem("ulogovan")
    if(x)
      this.vlasnik = JSON.parse(x)
    this.vikendicaService.getVikendicaForVlasnik(this.vlasnik.korisnickoIme).subscribe(data =>{
      if(data)
        this.mojeVikendice = data
    })
  }

  izmeniForma = false;
  izmenjenaVikendica : Vikendica = new Vikendica()
  izmeni(vikendica : Vikendica){
    this.izmeniForma = true
    Object.assign(this.izmenjenaVikendica, vikendica);
  }

  potvrdiIzmenu(){
    this.vikendicaService.azuriraj(this.izmenjenaVikendica).subscribe(data => {
      alert(data.message)
      this.izmeniForma = false
      this.izmenjenaVikendica = new Vikendica()
      this.mojeVikendice = []
      this.ngOnInit()
    })
  }

  obrisi(vikendica : Vikendica){
    this.vikendicaService.obrisi(vikendica).subscribe(data =>{ 
        alert(data.message)
        this.izmeniForma = false
        this.mojeVikendice = []
        this.ngOnInit()
      })
    
  }
}
