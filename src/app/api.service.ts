import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.ENDPOINT;
  options: any;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
      })
    }
  }

  // Lista de ubicaciones
  public listLocation() {
    return this.http.get(this.url + '/locationsList');
  }

  // Agregar Ubicaciones
  public addLocation(obj) {
    return this.http.post(this.url + '/insertLocation', obj, this.options);
  }

  // Agregar Ubicaciones
  public editLocation(obj) {
    return this.http.put(this.url + '/location/' + obj.id, obj, this.options);
  }

  // Agregar Ubicaciones
  public deleteLocation(id) {
    return this.http.delete(this.url + '/location/' + id, this.options);
  }

}
