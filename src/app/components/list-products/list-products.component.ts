import { Component, OnInit } from '@angular/core';
import {product} from 'src/app/models/product';
import swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { ReservaService } from 'src/app/services/reserva.service';
import { Envio } from 'src/app/models/shippments';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listEnvio: Envio[] =  []; 
 

  constructor(
    private servi : ReservaService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getProduct()
    
  }

  mostrarPopup = false;
  envioSeleccionadoId: number | null = null;
  
  abrirPopup(envioId: number) {
    this.envioSeleccionadoId = envioId;
    this.mostrarPopup = true;
  }
  
  cerrarPopup() {
    this.mostrarPopup = false;
    this.envioSeleccionadoId = null;
  }
  


  getProduct(){
    const iduser = localStorage.getItem('idUser');
    
    this.servi.getreservaByid(iduser).subscribe(
      data=>{
        this.listEnvio = data;
   
      },error=>{
        swal.fire({
          icon: 'error',
          title: 'Sin conexión a la base de datos ',
        
        })
      }
    )


   
  


  }







}