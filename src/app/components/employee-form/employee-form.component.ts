import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class EmployeeFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    @Optional() public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      jobTitle: [data?.jobTitle || '', [Validators.required]],
    });
  }

  saveEmployee(): void {
    if (this.form.valid) {
      const employee = this.form.value;
      console.log('Payload enviado:', employee);

      if (employee.id) {
        this.employeeService.updateEmployee(employee.id, employee).subscribe({
          next: () => this.dialogRef?.close(true),
          error: (err) => console.error('Error updating employee:', err),
        });
      } else {
        this.employeeService.createEmployee(employee).subscribe({
          next: () => this.dialogRef?.close(true),
          error: (err) => console.error('Error creating employee:', err),
        });
      }
    }
  }
}