import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TuristaComponent } from '../turista/turista.component';
import { VlasnikComponent } from '../vlasnik/vlasnik.component';
import { RegisterComponent } from '../register/register.component';
import { VikendiceComponent } from '../vikendice/vikendice.component';
import { VikendicaInfoComponent } from '../vikendica-info/vikendica-info.component';
import { PlatiComponent } from '../plati/plati.component';
import { AdminComponent } from '../admin/admin.component';
import { PocetnaComponent } from '../pocetna/pocetna.component';

export const routes: Routes = [
    {path: '', component : PocetnaComponent},
    {path: 'login', component: LoginComponent},
    {path: 'loginAdmin', component: LoginComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'register', component : RegisterComponent},
    {path: 'turista', component : TuristaComponent},
    {path: 'vlasnik', component : VlasnikComponent},
    {path: 'vikendicaInfo', component: VikendicaInfoComponent},
    {path: 'placanje', component: PlatiComponent}
];
