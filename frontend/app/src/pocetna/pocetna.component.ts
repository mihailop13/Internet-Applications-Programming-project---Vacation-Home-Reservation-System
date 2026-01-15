import { Component, inject } from '@angular/core';
import { VikendiceComponent } from '../vikendice/vikendice.component';
import Rezervacija from '../models/rezervacija';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { RezervacijeService } from '../services/rezervacije.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  standalone: true,
  imports: [VikendiceComponent, RouterModule],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css'
})
export class PocetnaComponent {

  korisniciRegistrovani : User[] = []

  rezervacije : Rezervacija[] = []

  brojTurista = 0
  brojVlasnika = 0
  rezervacija24casa = 0
  rezervacije7dana = 0
  rezervacije30dana = 0

  private userService = inject(UserService)
  private rezervacijeService = inject(RezervacijeService)

  ngOnInit() : void{
    localStorage.clear()
    this.userService.getAllUsers().subscribe(data =>{
      if(data)
        for(const u of data){
          if(u.odobreno === "da")
            this.korisniciRegistrovani.push(u)
        }

      for (const user of this.korisniciRegistrovani) {
        if(user.tip === "vlasnik")
          this.brojVlasnika++
        else if(user.tip === "turista")
          this.brojTurista++
      }
    })

    this.rezervacijeService.dohvatiSveRezervacije().subscribe(data =>{
      if(data)
        this.rezervacije = data
      for(const rezervacija of this.rezervacije){
        const date = new Date(rezervacija.datumRezervacije)
        if(Date.now() - date.getTime() <= 24*60*60*1000){
          this.rezervacija24casa++
          this.rezervacije7dana++
          this.rezervacije30dana++
        } else if(Date.now() - date.getTime() <= 7*24*60*60*1000){
          this.rezervacije7dana++
          this.rezervacije30dana++
        } else if((Date.now() - date.getTime() <= 30*24*60*60*1000)){
          this.rezervacije30dana++
        }
      }
    })
  }
}
