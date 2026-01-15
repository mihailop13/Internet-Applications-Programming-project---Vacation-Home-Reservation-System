import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Rezervacija from '../models/rezervacija';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeService {

  constructor() { }
    
  private http = inject(HttpClient);
  url = "http://localhost:4000/rezervacije";

  rezervisi(rezervacija : Rezervacija){
    const data = rezervacija;
    return this.http.post<Message>(`${this.url}/dodajRezervaciju`, data)
  }

  dohvatiSveRezervacije(){
    return this.http.get<Rezervacija[]>(`${this.url}/dohvatiSveRezervacije`);
  }

  getRezervacija(id : number){
    const params = new HttpParams()
        .set('id', id);
    return this.http.get<Rezervacija>(`${this.url}/getRezervacija`, {params})
  }

  dohvatiRezervacijeTurista(userName : string){
    const params = new HttpParams()
        .set('korisnickoIme', userName);
    return this.http.get<Rezervacija[]>(`${this.url}/dohvatiRezervacijuTurista`, {params})
  }

  dohvatiRezervacijeVlasnik(userName : string){
    const params = new HttpParams()
        .set('korisnickoIme', userName);
    return this.http.get<Rezervacija[]>(`${this.url}/dohvatiRezervacijuVlasnik`, {params})
  }

  oceni(rezervacija : Rezervacija){
    const data = rezervacija;
    return this.http.post<Message>(`${this.url}/oceniVikendicu`, data)
  }

  otkazi(rezervacija : Rezervacija){
    const data = rezervacija
    return this.http.post<Message>(`${this.url}/otkaziRezervaciju`, data)
  }

  potvrdi(rezervacija : Rezervacija){
    const data = rezervacija
    return this.http.post<Message>(`${this.url}/potvrdiRezervaciju`, data)
  }

  odbij(rezervacija : Rezervacija){
    const data = rezervacija
    return this.http.post<Message>(`${this.url}/odbijRezervaciju`, data)
  }
}
