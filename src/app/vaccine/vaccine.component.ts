import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Health } from '../popup/popup.component';

export interface Student{
    mFirstName: string;
    mLastName: string;
    mIdNumber: string;
    mClass: string;
    mSection: string;
    mPhone: string;
    mAddress: string;
    mMotherID: string;
    mFatherId: string;
    mIsVaccinated:boolean;
    mVaccines:[Vaccine];
    mCurrentBMI:number;
    bmi:string;
    mHealthProfile:[Health];
}

export interface Vaccine{
  type:string;
  date:string;
  mVaccineName:string
}
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
})
export class VaccineComponent implements OnInit {
  mVaccineName = 'MMRV';
  mClass = '1';
  mSection = '1';
  hasRetrieved=false
  students:Student[]=[];
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {}

  handleSubmit(f: any) {
    console.log(f.value);

    this.backendService
      .getStudentByClass(f.value)
      .subscribe((res) => {
        if (res) {
          console.log(res)
          this.hasRetrieved=true
        }
         this.students=res;
      });
  }


   vaccinate(f:any){
    this.backendService
      .vaccinateStudent(f)
      .subscribe((res) => {
        if (res) {
          console.log(res);
        }
      });
  }

  updateVaccineState(sid:string,state:boolean){

    const updatedList=this.students.map(student => {
      if(student.mIdNumber!=sid){
        return student;
      }
      else{
      return student.mIsVaccinated=state;
      }
    });

    const payload={
      mDate:new Date(),
      mIdNumber:sid,
      mVaccineName:this.mVaccineName,
      state:state
    }
    this.vaccinate(payload)
    console.log(sid)
  }
}
