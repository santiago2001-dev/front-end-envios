import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  url = 'https://envios.devinovate.online/api/shipments'

  constructor(
    private http : HttpClient
  ) { }



 
  getreservaByid(id:any):Observable<any>{
    return this.http.get(this.url+'/user/'+id);
    
  }



  addreserva(reserva: any):Observable<any>{
    return this.http.post(this.url,reserva);

  }


  cotizar(reserva: any):Observable<any>{
    return this.http.post(this.url+'/quote',reserva);

  }



  


 
}
