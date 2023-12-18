import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css'
})
export class BasicComponent implements OnInit {

  @Input() patientData: any;
  @Output() emitSearchData = new EventEmitter<any>();
  filteredData: any = [];

  basicForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  })

  submitBasicForm() {
    console.log(this.basicForm.value);

    // filtering patient data
    this.filteredData = this.patientData.filter((patient: any) => {
      let returnFlag = null;
      if (this.basicForm.get('firstName')?.value?.length) {
        returnFlag = this.basicForm.get('firstName')?.value == patient.firstName ? true : false;
      }
      if (this.basicForm.get('lastName')?.value?.length && returnFlag != false) {
        returnFlag = this.basicForm.get('lastName')?.value == patient.lastName ? true : false;
      }
      if (this.basicForm.get('dateOfBirth')?.value?.length && returnFlag != false) {
        let formDOBValue = this.basicForm.get('dateOfBirth')?.value;
        returnFlag = moment(formDOBValue).isSame(moment(patient.dateOfBirth)) ? true : false;
      }
      if (this.basicForm.get('startDate')?.value?.length && this.basicForm.get('endDate')?.value?.length &&
          returnFlag != false) {
            let formStartDate = this.basicForm.get('startDate')?.value;
            let formEndDate = this.basicForm.get('endDate')?.value;
            returnFlag = (moment(patient.appointmentDate).isSameOrAfter(moment(formStartDate)) && moment(patient.appointmentDate).isSameOrBefore(moment(formEndDate)))  ?
                true : false;
      }
      return returnFlag;
    })
    console.log('filteredData is', this.filteredData);
    this.emitSearchData.emit(this.filteredData);
  }

  ngOnInit() {
    console.log('patientData ', this.patientData);
  }

}
