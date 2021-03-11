import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configURL = 'assets/config.json';

  config = new Config();

  constructor(
    private http: HttpClient
  ) { }

  load() {
    
    return this.http.get<Config>(this.configURL)
      .toPromise()
      .then( data => {
        this.config = data;
      });
      
  }

}
