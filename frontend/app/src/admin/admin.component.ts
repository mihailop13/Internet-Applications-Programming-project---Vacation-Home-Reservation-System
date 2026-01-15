import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { FormsModule } from '@angular/forms';
import { VikendicaService } from '../services/vikendica.service';
import Vikendica from '../models/vikendica';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  private userService = inject(UserService)
  private vikendiceService = inject(VikendicaService)

  neOdobreniKorisnici : User[] = []
  odobreniKorisnici : User[] = []
  vikendice : Vikendica[] = []
  numTuristi = 0;
  numVlasnici = 0;
  ngOnInit() : void{
    this.neOdobreniKorisnici = []
    this.odobreniKorisnici = []
    this.vikendice = []
    this.numTuristi = 0
    this.numVlasnici = 0
    this.izmeniForma = false
    this.staroKorIme = ""
    this.userService.getAllUsers().subscribe(data =>{
      if(data){
        for(const u of data){
          if(u.odobreno === "da"){
            if(u.tip === "vlasnik")
              this.numVlasnici++
            else
              this.numTuristi++
            this.odobreniKorisnici.push(u)
          }
        }
        for(const u of data){
          if(u.odobreno === "cekanje"){
            this.neOdobreniKorisnici.push(u)
          }
        }
      }
    });
    this.vikendiceService.getAllVikendice().subscribe(data =>{
      if(data){
        this.vikendice = data;
      }
    })
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

  odobri(user: User){
    this.userService.odobriKorisnika(user).subscribe(data => {
      if(data){
        this.ngOnInit();
        alert(data.message)
      }
    })
  }

  odbij(user: User){
    this.userService.odobbijKorisnika(user).subscribe(data => {
      if(data){
        this.ngOnInit();
        alert(data.message)
      }
    })

  }

  izmeniForma = false;
  staroKorIme = ""
  korisnikAzuriran : User = new User()
  prikaziIzmeniForma(user : User){   //staro korisnicko Ime ako ga korisnik promeni
    this.staroKorIme = user.korisnickoIme
    this.izmeniForma = true;
    Object.assign(this.korisnikAzuriran, user)
  }

  izmeni(){
    this.userService.azurirajPodatke(this.korisnikAzuriran, this.staroKorIme).subscribe(data => {
      if(data){
        alert(data.message)
        this.ngOnInit()
      }
    })
  }
  
  card = ""

  checkCard(){
    const patternVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
    const patternMaster = /^5[1-5]\d{14}$/
    const patternDiners = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    if(patternMaster.test(this.korisnikAzuriran.brojKreditneKartice))
        this.card = "assets/images/MasterCard-logo.png"
    else if(patternVisa.test(this.korisnikAzuriran.brojKreditneKartice))
        this.card =  "assets/images/Visa-Logo.png"
    else if(patternDiners.test(this.korisnikAzuriran.brojKreditneKartice))
        this.card =  "assets/images/Diners-logo.png"
  }

  block(vikendica : Vikendica){
    vikendica.blokiranoDo = new Date(Date.now() + 48*60*60*1000).toLocaleString();
    this.vikendiceService.azuriraj(vikendica).subscribe(data =>{
      if(data)
        this.ngOnInit()
        alert(data.message)
    })
  }
}
