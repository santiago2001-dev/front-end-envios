import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginSer: LoginService
  ) { 

    this.registerForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      pass: ['', Validators.required],
      nombres: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.invalid) {
      swal.fire({
        icon: 'error',
        title: 'los campos son obligatorios',
      });
    } else {
      const User: user = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('pass')?.value,
        username: this.registerForm.get('nombres')?.value,
      };

      this.loginSer.register(User).subscribe(
        (data) => {
        
          swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/login']);

        },
        (error) => {
          const errorMessage = error.error?.error || 'Error desconocido'; // Manejo de caso en el que 'error' o 'error.error' podrían ser indefinidos

          swal.fire({
            icon: 'error',
            title: errorMessage,
          });
        }
      );
    }
  }

}
