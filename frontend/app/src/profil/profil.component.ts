import { Component, inject } from '@angular/core';
import User from '../models/user';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/file-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  user: User = new User()
  imageUrl: string = '';

  selectedFile: File | null = null;
  private fileService = inject(FileService)
  private userService = inject(UserService)

  card = ""

  ngOnInit() : void{
    this.imageUrl = 'http://localhost:4000/profilne/'
    let x = localStorage.getItem("ulogovan");
    if (x != null) {
      this.user= JSON.parse(x);
      this.imageUrl = this.imageUrl + this.user.profilnaSlika
    }
  }

  azuriraj = false
  azurirajMode(){
    this.azuriraj = true
  }

  azurirajPodatke(){
    if(this.selectedFile instanceof File && this.user.profilnaSlika !== this.selectedFile.name){
      let oldImage = this.user.profilnaSlika
      this.user.profilnaSlika = this.user.korisnickoIme + '_' + this.selectedFile.name
      if(this.selectedFile != null){
        this.fileService.update(this.selectedFile, oldImage, this.user.profilnaSlika).subscribe(data =>{
          alert("Poruka:\n\n" + data.message)
        })
      }
    } else{
      if(this.user.profilnaSlika === ""){
        if(this.user.pol === "M")
          this.user.profilnaSlika = "man.png"
        else
          this.user.profilnaSlika = "woman.png"
      }
    }
        
    this.userService.azurirajPodatke(this.user, this.user.korisnickoIme).subscribe(data =>{
      alert("Poruka:\n\n" + data.message)
    })

    localStorage.clear()
    localStorage.setItem('ulogovan', JSON.stringify(this.user))
    this.azuriraj = false
    this.ngOnInit()
  }
  
  checkCard(){
    const patternVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
    const patternMaster = /^5[1-5]\d{14}$/
    const patternDiners = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
    if(patternMaster.test(this.user.brojKreditneKartice))
      this.card = "assets/images/MasterCard-logo.png"
    else if(patternVisa.test(this.user.brojKreditneKartice))
      this.card =  "assets/images/Visa-Logo.png"
    else if(patternDiners.test(this.user.brojKreditneKartice))
      this.card =  "assets/images/Diners-logo.png"
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if(file.type !== "image/png" && file.type !== "image/jpg"){
      alert("Pogresan format slike. Slika mora imati PNG/JPG format.")
      return
    }
    const img = new Image();
    img.onload = () => {
      if(img.width * img.height < 100*100 || img.width * img.height > 300*300){
        alert("Slika nije odgovarajuce velicine!\n Minimalna velicina: 100 x 100 px\nMaksimalna velicina: 300 x 300 px")
        return
      }
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
    this.selectedFile = file
  }
}
