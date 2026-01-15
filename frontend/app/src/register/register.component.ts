import { Component, inject } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileService } from '../services/file-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    user: User = new User();
    private userService = inject(UserService);
    selectedFile: File | null = null;
    private fileService = inject(FileService)
    message = ""
    card = ""
    register(){
        localStorage.clear()
        if(!this.checkUserData()){
            if(this.message !== "Pogresan format kartice!")
                this.message = "Niste uneli sve podatke!"
            return
        }
        if(this.selectedFile instanceof File){
            this.user.profilnaSlika =  this.user.korisnickoIme + '_' + this.selectedFile.name
            if(this.selectedFile != null){
                    this.fileService.upload(this.selectedFile, this.user.profilnaSlika).subscribe(data =>{
                    this.message = data.message
                })
            }
        } else{
            this.user.profilnaSlika = ""
        }
        
        this.userService.register(this.user).subscribe(data =>{
                this.message = data.message
        })
    }

    private checkUserData() : boolean{
        if(this.card === "") {this.message = "Pogresan format kartice!"; return false}
        else if(this.user.adresa === "" || this.user.brojKreditneKartice === ""
            || this.user.email === "" || this.user.ime === "" || this.user.kontaktTelefon === "" ||
            this.user.korisnickoIme === "" || this.user.lozinka === "" || this.user.pol === "" ||
            this.user.prezime === "" || this.user.tip === ""
        ){  
            return false
        } 
        return true
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
        else 
            this.card = ""
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (!file) return;
        console.log(file.type)
        if(file.type !== "image/png" && file.type !== "image/jpg"){
            alert("Greska:\n\nPogresan format slike. Slika mora imati PNG/JPG format.")
            return
        }
        const img = new Image();
        img.onload = () => {
            if(img.width * img.height < 100*100 || img.width * img.height > 300*300){
                alert("Greska:\n\nSlika nije odgovarajuce velicine!\n Minimalna velicina: 100 x 100 px\nMaksimalna velicina: 300 x 300 px")
                return
            }
            URL.revokeObjectURL(img.src);               //ne treba mi vise taj link obrisi ga
        };

        img.src = URL.createObjectURL(file);
        this.selectedFile = file
    }
}
