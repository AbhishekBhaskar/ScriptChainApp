import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BasicComponent } from './components/basic/basic.component';
import { AdvancedComponent } from './components/advanced/advanced.component';
import patientData from './../assets/data.json';
import moment from 'moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    BasicComponent,
    AdvancedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'scriptchain-app';
  displayFormFlag = true;
  displayTodaysPatients = true;
  patientData: any = patientData;
  todaysPatientList: any = [];
  dataToDisplay: any = []
  searchedData: any = [];

  displayBasicForm() {
    this.displayFormFlag = true;
  }
  hideBasicForm() {
    this.displayFormFlag = false;
  }

  displayTodaysData() {
    this.displayTodaysPatients = true;
    this.dataToDisplay = this.todaysPatientList;
  }
  hideTodaysData() {
    this.displayTodaysPatients = false;
    this.dataToDisplay = this.searchedData;
  }

  displayFilteredResults(filteredData: any) {
    console.log('Search data is ', filteredData);
    this.dataToDisplay = filteredData;
    this.searchedData = [...filteredData];
    this.displayTodaysPatients = false;
  }


  ngOnInit() {
    this.todaysPatientList = this.patientData.filter((patient: any) => {
      let formattedApptDate = moment(patient.appointmentDate).format('MM/DD/YYYY');
      let formattedTodaysDate = moment().format('MM/DD/YYYY');
      if (formattedApptDate == formattedTodaysDate) {
        return true;
      } else {
        return false;
      }
    });
    console.log('todaysPatientList is ', this.todaysPatientList);
    this.dataToDisplay = this.todaysPatientList;
  }
}
