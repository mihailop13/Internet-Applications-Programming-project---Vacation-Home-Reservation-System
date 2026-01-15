import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/message';
import Vikendica from "../models/vikendica"

@Injectable({
  providedIn: 'root'
})
export class FileService{

  constructor() { }

  private http = inject(HttpClient);

  url = "http://localhost:4000/file";

  upload(file:File, profilnaSlika : string){
    const formData = new FormData();
    formData.append('image', file, profilnaSlika);

    return this.http.post<Message>(`${this.url}/upload`, formData)
  }

  update(file:File, oldImage: string, profilnaSlika : string){
    const formData = new FormData();
    formData.append('image', file, profilnaSlika);
    formData.append('oldImage', oldImage);

    return this.http.post<Message>(`${this.url}/updateImage`, formData)
  }

  urlVikendica = "http://localhost:4000/fileVikendica";
  
  uploadMultiple(files:FileList, vikendica : Vikendica){
    const formData = new FormData();

    // Dodaj svaku sliku iz FileList-a
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i], vikendica.slike[i]);
      //console.log(files[i])
    }

    return this.http.post<Message>(`${this.urlVikendica}/uploadMultiple`, formData);
  }
}
