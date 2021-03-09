import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';

export abstract class ApiServiceService<T> {

  private url = "";

  constructor(
    protected path: string,
    protected http: HttpClient,
    protected app: ConfigService
  ) {
    this.url = `${app.config.apiUrl}/${path}`;
  }

  getHeaders() {
    
    let aux = JSON.parse(localStorage.getItem("FALTA_DEFINIR"));
    let httpOptions = {};

    if(aux) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': aux.usuaToken
        })
      };
    } 

    return httpOptions;

  }

  public handleError(error: Response) {
    
    if(error.status === 410) {
      console.log(error);
      window.location.href = '/';
    }

    alert('Accion no autorizada.');

    return throwError(error.toString());

  }

  post(data: T) : Observable<T> {

    let payload = JSON.stringify(data);

    return this.http.post<T>(
      this.url, payload, this.getHeaders()
    ).pipe(catchError(this.handleError));

  }

  get( params?: string) : Observable<T[]> {

    const p = params ? `?${params}` : '';

    return this.http.get<T[]>(
      `${this.url}${p}`, this.getHeaders()
    ).pipe(catchError(this.handleError));

  }

  getId(id?: number, params?: string) : Observable<T> {

    const p = params ? `?${params}` : '';

    return this.http.get<T>(
      `${this.url}/${id}${p}`, this.getHeaders()
    ).pipe(catchError(this.handleError));

  }

  put(data: T) : Observable<T> {
    
    let payload = JSON.stringify(data);

    return this.http.put<T>(
      this.url, payload, this.getHeaders()
    ).pipe(catchError(this.handleError));

  }

  delete(id: number) : Observable<any> {

    return this.http.delete(
      `${this.url}/${id}`, this.getHeaders()
    ).pipe(catchError(this.handleError));

  }


}
