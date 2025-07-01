import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, user } from '../models/login';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'https://envios.devinovate.online/api/auth/'
  public token : String |any;
  private tokenDes: any;
  constructor(
    private http : HttpClient,
    private jwHelper : JwtHelperService

  ) { }

  login(credenciales : login):Observable<any>{
    let url = `${this.url}login`
     return this.http.post(url,credenciales)
     
   }

   register(user : user):Observable<any>{
    let url = `${this.url}register`
     return this.http.post(url,user)
     
   }
   isLoggin():boolean{
    this.token = localStorage.getItem('authToken');
  
    if(this.jwHelper.isTokenExpired(this.token) || !localStorage.getItem('authToken')){
      return false
  
    }
    return true
  
  } 
  isPermis(): string {
    this.token = localStorage.getItem('authToken');

    if (this.token) {
      this.tokenDes = jwtDecode(this.token);
      return this.tokenDes;
    }

    return '';
  }
  getAllUsers():Observable<any>{
    let url = `${this.url}`;
    return this.http.get(url)

  }
}

function jwtDecode(token: any): any {
  throw new Error('Function not implemented.');
}
