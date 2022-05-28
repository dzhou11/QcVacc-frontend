import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public persons: Person[];
    public dummyPerson!: Person;
    public deletePerson!: Person;
    public updatePerson!: Person;


    constructor(private personService: PersonService) { 
      this.persons = [];
    }

    ngOnInit(): void { // call that method when this component is loaded/initialized
      this.getPersons();
    }

    public getPersons():void{ // set persons when we get response back from the server
      this.personService.getPersons().subscribe(
        (response: Person[]) => {
          this.persons = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    public onOpenModal(person:Person,mode:string): void{
      const container = document.getElementById('main-container');
      const button = document.createElement("botton"); // name of element
      //button.type = 'button'; // type of elment, default is submit
      button.style.display = 'none';
      button.setAttribute('data-toggle','modal');

      if (mode ==='add'){
        button.setAttribute('data-target','#addPersonModal');
      }
      if (mode ==='edit'){
        this.updatePerson = person;
        button.setAttribute('data-target','#updatePersonModal');
      }
      if (mode ==='delete'){
        this.deletePerson = person;
        button.setAttribute('data-target','#deletePersonModal');
      }
      
      container?.appendChild(button);
      button.click();
    }
    public onAddPerson(addForm: NgForm): void {
      
      document.getElementById('add-person-form')!.click();
      
      this.personService.addPerson(addForm.value).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeletePerson(id: number|undefined): void {
    if (id){
    this.personService.deletePerson(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getPersons();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
    }
  }
  public onUpdatePerson(person: Person): void {
    
    this.personService.updatePerson(person).subscribe(
      (response: Person) => {
        console.log(response);
        this.getPersons();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public searchPersons(key: string): void {
    console.log(key);
    const results: Person[] = [];
    for (const person of this.persons) {
      if (person.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.city.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(person);
      }
    }
    this.persons = results;
    if (results.length === 0 || !key) {
      this.getPersons();
    }
  }
}   
