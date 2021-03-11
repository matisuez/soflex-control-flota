import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceService } from '../core/api-service.service';
import { ConfigService } from '../core/config.service';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends ApiServiceService<Grupo> {

  constructor(
    protected http: HttpClient,
    protected app: ConfigService
  ) {
    super('grupo', http, app);
  }

}
