import { Component } from '@angular/core';
import { PromenaLozinkeComponent } from '../promena-lozinke/promena-lozinke.component';
import { ProfilComponent } from "../profil/profil.component";
import { RouterModule } from '@angular/router';
import { RezervacijeTuristaComponent } from "../rezervacijeTurista/rezervacijeTurista.component";
import { VikendiceComponent } from "../vikendice/vikendice.component";

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [PromenaLozinkeComponent, ProfilComponent, RouterModule, RezervacijeTuristaComponent, VikendiceComponent],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent {
  
  trenutnoPrikazano = ""
  ngOnInit() : void{
    this.trenutnoPrikazano = "profil"
  }

  switchView(view : string){
    this.trenutnoPrikazano = view;
  }

}
