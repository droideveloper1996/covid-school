import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { Student } from '../vaccine/vaccine.component';

@Component({
  selector: 'app-principal-report',
  templateUrl: './principal-report.component.html',
  styleUrls: ['./principal-report.component.css'],
})
export class PrincipalReportComponent implements OnInit {
  mVaccineName = 'MMRV';
  mClass = '1';
  mSection = '1';
  mExtra = 'All';
  hasRetrieved = false;
  students: Student[] = [];
  constructor(private backendService: BackendService, private _snackBar: MatSnackBar,) {}

  ngOnInit(): void {}

  handleSubmit(f: any) {
    console.log(f.value);
    if (this.mExtra == 'All') {
      this.backendService.getAllStudents().subscribe((res) => {
        if (res) {
          console.log(res);
          this.hasRetrieved = true;
        }
        this.students = res;
      },err=>{
        this.openSnackBar(err.error.msg)
      });
    } else if (this.mExtra == 'Vaccinated') {
      this.backendService.getAllVaccinated().subscribe((res) => {
        if (res) {
          console.log(res);
          this.hasRetrieved = true;
        }
        this.students = res;
      },err=>{
        this.openSnackBar(err.error.msg)
      });

    } else {
      this.backendService.getNotVaccinated().subscribe((res) => {
        if (res) {
          console.log(res);
          this.hasRetrieved = true;
        }
        this.students = res;
      },err=>{
        this.openSnackBar(err.error.msg)
      });
    }
  }

  getStudent() {}

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 1000,
    });
  }
}
