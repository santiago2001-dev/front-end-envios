import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../../models/product';
import { ReservaService } from 'src/app/services/reserva.service';
//import { reserva } from 'src/app/models/reserva';
import { LoginService } from 'src/app/services/login.service';
import { user } from 'src/app/models/login';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {

 reservaForm: FormGroup;
  Id: String | null;
  Titulo = 'cotizar reserva';
  users: user[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private serv: ReservaService,
    private usersService: LoginService
  ) {
    this.reservaForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      peso: [null, [Validators.required, Validators.min(0)]],
      alto: [null, [Validators.required, Validators.min(0)]],
      ancho: [null, [Validators.required, Validators.min(0)]],
      largo: [null, [Validators.required, Validators.min(0)]],
      
    });

    this.Id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) {
      const invalidFields = Object.keys(this.reservaForm.controls).filter(
        (field) => this.reservaForm.get(field)?.invalid
      );

      const fieldNames = invalidFields.map((field) => {
        switch (field) {
          case 'origen':
            return 'Origen';
          case 'destino':
            return 'Destino';
          case 'peso':
            return 'Peso';
          case 'alto':
            return 'Alto';
          case 'ancho':
            return 'Ancho';
          case 'largo':
            return 'Largo';
         
          default:
            return field;
        }
      });

      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: `Por favor, completa correctamente los siguientes campos: ${fieldNames.join(', ')}.`,
      });
      return; // Si el formulario no es válido, no se envía
    }

    const iduser = localStorage.getItem('idUser');
    const reservaData = {
      origen: this.reservaForm.value.origen,
      destino: this.reservaForm.value.destino,
      peso: this.reservaForm.value.peso,
      alto: this.reservaForm.value.alto,
      ancho: this.reservaForm.value.ancho,
      largo: this.reservaForm.value.largo,
      
    };

    this.serv.cotizar(reservaData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'cotizacion exitosa',
          text: response.valorCotizado,
        });
        this.router.navigate(['/']); // Redirige al usuario después de la creación
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la reserva',
          text: 'Ocurrió un problema al intentar calcular la cotizaion ',
        });
        console.error('Error al crear la reserva:', error);
      }
    );
  }
}


