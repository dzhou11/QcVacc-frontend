import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // root component which is app.module.ts
})
export class PersonService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { } // use this HttpClient to work with backend

  public getPersons(): Observable<Person[]>{  // use the http client to call the backend
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`);
  }

  public addPerson(person : Person): Observable<Person>{  // use the http client to call the backend
    return this.http.post<Person>(`${this.apiServerUrl}/person/add`,person);
  }

  public updatePerson(person : Person): Observable<Person>{  // use the http client to call the backend
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`,person);
  }

  public deletePerson(id : number): Observable<void>{  // use the http client to call the backend
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/`+id);
  }
}
