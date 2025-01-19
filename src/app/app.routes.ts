import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

// Exportamos 'routes' como se espera en 'app.config.ts'
export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
];
