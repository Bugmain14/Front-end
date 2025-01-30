import { ApplicationModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

export const appConfig: ApplicationModule = {
  providers: [
    provideRouter(routes),
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ]
};
