import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ProfilComponent } from "../profil/profil.component";
import { VikendiceVlasnikComponent } from "../vikendice-vlasnik/vikendice-vlasnik.component";
import { RezervacijeVlasnikComponent } from "../rezervacije-vlasnik/rezervacije-vlasnik.component";
import { DodajVikendicuComponent } from "../dodaj-vikendicu/dodaj-vikendicu.component";
import { PromenaLozinkeComponent } from "../promena-lozinke/promena-lozinke.component";

@Component({
  selector: 'app-vlasnik',
  standalone: true,
  imports: [RouterModule, ProfilComponent, VikendiceVlasnikComponent, RezervacijeVlasnikComponent, DodajVikendicuComponent, PromenaLozinkeComponent],
  templateUrl: './vlasnik.component.html',
  styleUrl: './vlasnik.component.css'
})
export class VlasnikComponent {

  trenutnoPrikazano = ""
  ngOnInit() : void{
    this.trenutnoPrikazano = "profil"
  }

  switchView(view : string){
    this.trenutnoPrikazano = view;
  }
}
