import { Component, inject } from '@angular/core';
import Vikendica from '../models/vikendica';
import { FormsModule } from '@angular/forms';
import User from '../models/user';
import { FileService } from '../services/file-service';
import { VikendicaService } from '../services/vikendica.service';

@Component({
  selector: 'app-dodaj-vikendicu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dodaj-vikendicu.component.html',
  styleUrl: './dodaj-vikendicu.component.css'
})
export class DodajVikendicuComponent {

  vikendica : Vikendica = new Vikendica();

  vlasnik : User = new User();

  selectedFiles: FileList | null = null;

  private fileService = inject(FileService)
  private vikendicaService = inject(VikendicaService)

  message = ""

  dodajVikendicu(){
    let x = localStorage.getItem("ulogovan")
    if(x){
      this.vlasnik = JSON.parse(x)
    }
    this.vikendica.vlasnik = this.vlasnik.korisnickoIme
    if(this.selectedFiles){
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.vikendica.slike[i] = this.vikendica.naziv + '_' + this.selectedFiles[i].name
    }
      this.fileService.uploadMultiple(this.selectedFiles, this.vikendica).subscribe(data =>{});
    }
      
    this.vikendicaService.dodajVikendicu(this.vikendica).subscribe(data =>{
        if(data)
          alert("Poruka:\n\n" + data.message)
    });
  }

  ngOnInit() : void{
    let x = localStorage.getItem("ulogovan");
    if (x != null) {
      this.vlasnik= JSON.parse(x);
    }
  }

  onFilesSelected(event : any){
    const input = event.target;
    if (input.files) {
      this.selectedFiles = input.files;
    }
  }

  selectedJSON: FileList | null = null;

  async onJSONSelected(event : any){
    const file = event.target.files[0];
    if (file) {
      this.selectedJSON = file;
      const text = await file.text();       //ovo text() je asinhrono
      const parsed = JSON.parse(text)
      Object.assign(this.vikendica, parsed);
    }
  }

}
