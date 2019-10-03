import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getUserList(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
}
