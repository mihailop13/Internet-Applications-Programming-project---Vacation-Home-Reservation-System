import { Component, inject } from '@angular/core';
import Vikendica from '../models/vikendica';
import { VikendicaService } from '../services/vikendica.service';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-vikendice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vikendice.component.html',
  styleUrl: './vikendice.component.css'
})

export class VikendiceComponent {

  vikendice : Vikendica[] = []

  private router = inject(Router)

  private vikendiceService = inject(VikendicaService)

  naziv = ""
  mesto = ""
  pocetna = true
  ngOnInit() : void{

    if(this.router.url.startsWith('/turista')){
      this.pocetna = false;
    }

    this.vikendiceService.getAllVikendice().subscribe(data =>{
      if(data){
        for(const v of data){
          if(v.blokiranoDo === "" || new Date(v.blokiranoDo).getTime() < new Date(Date.now()).getTime()){
            this.vikendice.push(v)
          }
        }
      }
    })
  } 

  pretragaVikendice : Vikendica[] = []

  pretraga(){
    if(this.mesto === "" && this.naziv === ""){
      this.pretragaVikendice = []
    } else if(this.mesto === "" && this.naziv !== ""){
      this.pretragaVikendice = this.vikendice.filter(v => v.naziv === this.naziv);
      if(this.pretragaVikendice.length === 0){ alert("Greska:\n\nNe postoje vikendice sa datim parametrom!")}
    } else if(this.naziv === "" && this.mesto !== ""){
      this.pretragaVikendice = this.vikendice.filter(v => v.mesto === this.mesto);
      if(this.pretragaVikendice.length === 0){ alert("Greska:\n\nNe postoje vikendice sa datim parametrom!")}
    } else{
      this.pretragaVikendice = this.vikendice.filter(v => v.mesto === this.mesto && v.naziv === this.naziv);
      if(this.pretragaVikendice.length === 0){ alert("Greska:\n\nNe postoje vikendice sa datim parametrima!")}
    }
  }

  private sortAsc = false

  sortNaziv(){
    this.vikendice.sort((a, b) => {
      const valA = a.naziv.toString().toLowerCase();
      const valB = b.naziv.toString().toLowerCase();

      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });
    if(this.sortAsc)
      this.sortAsc = false
    else
      this.sortAsc = true
  }

  prosecnaOcena(vikendica : Vikendica){
    if(vikendica.ocena.length === 0)
      return 0
    let sum = 0
    for(const n of vikendica.ocena){
      sum += n
    }
    let avg = sum/vikendica.ocena.length
    return avg.toFixed(2)
  }

  sortMesto(){
    this.vikendice.sort((a, b) => {
      const valA = a.mesto.toString().toLowerCase();
      const valB = b.mesto.toString().toLowerCase();

      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });

    if(this.sortAsc)
      this.sortAsc = false
    else
      this.sortAsc = true
  }

  vikendicaInfo(vikendica : Vikendica){
    if(vikendica)
      localStorage.setItem("vikendica", JSON.stringify(vikendica))
    this.router.navigate(["vikendicaInfo"])
  }

}
