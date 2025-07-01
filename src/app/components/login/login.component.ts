import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { login } from 'src/app/models/login';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  token :String|any
  tokenDes: String |any
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private loginSer: LoginService
  ) {
    this.loginform = this.fb.group({
      email: ['', Validators.required, Validators.email],
      pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  login() {
    if (this.loginform.invalid) {
      swal.fire({
        icon: 'error',
        title: 'los campos son obligatorios',
      });
    } else {
      const Login: login = {
        email: this.loginform.get('email')?.value,
        password: this.loginform.get('pass')?.value,
      };

      this.loginSer.login(Login).subscribe(
        (data) => {
          // Guarda el token en el almacenamiento local
          localStorage.setItem('authToken', data.access_token);
          this.tokenDes = jwtDecode(data.access_token);

          localStorage.setItem('idUser',this.tokenDes.usuario.id);

          swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/']);

        },
        (error) => {
          // Aquí se asume que el error tiene una propiedad 'error' con un objeto que tiene una propiedad 'error'
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
