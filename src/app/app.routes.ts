import { Routes } from '@angular/router';
import { CepComponent } from './cep/cep.component';
import { DddComponent } from './ddd/ddd.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cep', component: CepComponent},
  {path: 'ddd', component: DddComponent}
];
