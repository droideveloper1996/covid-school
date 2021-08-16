import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { Student, Vaccine } from '../vaccine/vaccine.component';

export interface Health {
  bmi: number;
  sem: number;
  height: number;
  weight: number;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  isProfileView = false;
  healthInfo: Health[] = [];
  summary=false;
  sampleV: Vaccine = {
    type: '',
    date: '',
    mVaccineName: '',
  };

  sampleHealth: Health = {
    bmi: 0,
    height: 0,
    weight: 0,
    sem: 0,
  };

  student: Student = {
    mFirstName: '',
    mLastName: '',
    mIdNumber: '',
    mClass: '',
    mSection: '',
    mPhone: '',
    mAddress: '',
    mMotherID: '',
    mFatherId: '',
    mIsVaccinated: false,
    mCurrentBMI: -1,
    bmi: '',
    mVaccines: [this.sampleV],
    mHealthProfile: [this.sampleHealth]
  };

  height=''
  weight=''
  semester=''

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private backendService:BackendService,    private _snackBar: MatSnackBar) {
    console.log(data)
    this.student = data.sid;
    if(data.viewType==='summary'){
      this.isProfileView=true;
    }
    else{
      this.isProfileView=false;
    }
    const mCurrentBMI=this.student.mCurrentBMI;
    if (parseInt(this.student.mCurrentBMI.toString()) < 12) {
      this.student['bmi'] = 'severly_under_weight';
    }
    else if (parseInt(this.student.mCurrentBMI.toString())>= 12 && this.student.mCurrentBMI < 13) {
      this.student['bmi'] = 'under_weight';
    }
    else if (parseInt(this.student.mCurrentBMI.toString()) >= 13 && this.student.mCurrentBMI < 18) {
      this.student['bmi'] = 'normal';
    }
    else if (parseInt(this.student.mCurrentBMI.toString()) >= 18 && this.student.mCurrentBMI < 20) {
      this.student['bmi'] = 'over_weight';
    } else {
      this.student['bmi'] = 'severly_over_weight';
    }
    
    console.log("Student Info",this.student);
    this.healthInfo=this.student.mHealthProfile;

    console.log('healrh Info',this.healthInfo)
  }

  ngOnInit(): void {}

  updateView(){
    this.isProfileView=!this.isProfileView
    console.log(this.isProfileView)
  }
  updateHealthData(f:any,id:string){
    console.log("health data",f.value,id)
    f.value['mIdNumber']=id;
    this.backendService.updateMedicalLogs(f.value).subscribe(res=>{
      if(res){
          this.openSnackBar('Profile was updated')
          window.location.reload();
      }
    },err=>{
      this.openSnackBar(err.error.msg+" Something went wrong")
    })
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 1000,
    });
  }

}
