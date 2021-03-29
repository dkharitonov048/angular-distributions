import { Injectable } from '@angular/core';
import { APPCONFIG } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(){
    // todo: some logic
    return APPCONFIG.token;
  }

}
