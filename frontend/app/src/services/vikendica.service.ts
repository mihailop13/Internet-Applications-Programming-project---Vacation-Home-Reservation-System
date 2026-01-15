import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Vikendica from '../models/vikendica';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class VikendicaService {

  constructor() { }
  
  private http = inject(HttpClient);
  url = "http://localhost:4000/vikendica";

  dodajVikendicu(vikendica : Vikendica){
    const data = vikendica
    return this.http.post<Message>(`${this.url}/dodajVikendicu`, data)
  }

  getAllVikendice() {
    return this.http.get<Vikendica[]>(`${this.url}/getVikendice`);
  }

  getVikendica(id : number){
    const params = new HttpParams()
        .set('id', id);
    return this.http.get<Vikendica>(`${this.url}/getVikendica`, {params})
  }

  getVikendicaForVlasnik(vlasnik : string) {
    const params = new HttpParams()
        .set('korIme', vlasnik);
    return this.http.get<Vikendica[]>(`${this.url}/getVikendicaForVlasnik`, {params})
  }

  azuriraj(vikendica : Vikendica){
    const data = vikendica
    return this.http.post<Message>(`${this.url}/azuriraj`, data)
  }

  obrisi(vikendica : Vikendica){
    const data = vikendica
    return this.http.post<Message>(`${this.url}/obrisi`, data)
  }
  
}
