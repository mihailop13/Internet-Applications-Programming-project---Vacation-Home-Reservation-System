import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../models/user';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient);
  url = "http://localhost:4000/user";

  login(username: string, password: string, admin: boolean) {
    let data = {
      username: username, password: password
    }
    if(admin)
      return this.http.post<User>(`${this.url}/loginAdmin`, data)
    else
      return this.http.post<User>(`${this.url}/login`, data)
  }

  getUser(userName : string){
    const params = new HttpParams()
    .set('korisnickoIme', userName);
    return this.http.get<User>(`${this.url}/getUser`, {params})
  }

  register(user: User){
    const data = user
    return this.http.post<Message>(`${this.url}/register`, data)
  }

  azurirajPodatke(user: User, korIme : string){
    const data = {
      user : user,
      korIme : korIme
    }
    return this.http.post<Message>(`${this.url}/azurirajPodatke`, data)
  }

  getAllUsers(){
    return this.http.get<User[]>(`${this.url}/getAllUsers`)
  }

  odobriKorisnika(user: User){
    const data = user
    return this.http.post<Message>(`${this.url}/odobriRegistraciju`, data)
  }

  odobbijKorisnika(user: User){
    const data = user
    return this.http.post<Message>(`${this.url}/odbijRegistraciju`, data)
  }

  promeniLozinku(username: string, novaLozinka: string){
    const data = {
      korisnickoIme : username,
      novaLozinka : novaLozinka
    }
    console.log(username)
    return this.http.post<Message>(`${this.url}/promeniLozinku`, data)
  }
  
}