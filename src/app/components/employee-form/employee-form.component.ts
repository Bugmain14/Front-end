// src/app/components/employee-form/employee-form.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,       // Importar el módulo de diálogos
    MatInputModule,        // Importar el módulo de entradas (input)
    MatFormFieldModule,    // Importar el módulo de campos de formulario
    ReactiveFormsModule,   // Importar el módulo para formularios reactivos
    BrowserAnimationsModule, // Necesario para animaciones de Angular Material
  ],
})
export class EmployeeFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [data?.email || '', [Validators.required, Validators.email]],
    });
  }

  saveEmployee(): void {
    if (this.form.valid) {
      const employee = this.form.value;

      if (employee.id) {
        this.employeeService.updateEmployee(employee.id, employee).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.employeeService.createEmployee(employee).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
