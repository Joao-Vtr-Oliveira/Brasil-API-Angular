import { Routes } from '@angular/router';
import { CepComponent } from './cep/cep.component';
import { DddComponent } from './ddd/ddd.component';

export const routes: Routes = [
  {path: 'cep', component: CepComponent},
  {path: 'ddd', component: DddComponent}
];
