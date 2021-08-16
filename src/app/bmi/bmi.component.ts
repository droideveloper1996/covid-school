import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { Student } from '../vaccine/vaccine.component';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
})
export class BmiComponent implements OnInit {
  students: Student[] = [];
  updatedUser: any;

  hasRetrieved = false;
  mBMIValue = 'all';
  mClass = '1';
  constructor(
    private backendService: BackendService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  handleSubmit(f: any) {
    console.log(f.value);
    this.backendService.getBMIByClass(f.value.mClass).subscribe(
      (res) => {
        if (res) {
          this.hasRetrieved = true;
          this.students = res;
          if (this.mBMIValue == 'all') {
            this.updatedUser = this.students.map((student) => {
              console.log(student.mCurrentBMI)
              if (parseInt(student.mCurrentBMI.toString()) < 12) {
                student['bmi'] = 'severly_under_weight';
              }
              else if (parseInt(student.mCurrentBMI.toString())>= 12 && student.mCurrentBMI < 13) {
                student['bmi'] = 'under_weight';
              }
              else if (parseInt(student.mCurrentBMI.toString()) >= 13 && student.mCurrentBMI < 18) {
                student['bmi'] = 'normal';
              }
              else if (parseInt(student.mCurrentBMI.toString()) >= 18 && student.mCurrentBMI < 20) {
                student['bmi'] = 'over_weight';
              } else {
                student['bmi'] = 'severly_over_weight';
              }
              return student;
            });
          }
          console.log(this.updatedUser);
        }
        //   if (this.mBMIValue == 'severly_under_weight') {
        //     this.updatedUser = this.students.map((student) => {
        //       if (student.mCurrentBMI < 12) {
        //         return student;
        //       }
        //     });
        //   }
        //   if (this.mBMIValue == 'under_weight') {
        //     this.updatedUser = this.students.map((student) => {
        //       if (student.mCurrentBMI >= 12 && student.mCurrentBMI < 13) {
        //         return student;
        //       }
        //     });
        //   }
        //   if (this.mBMIValue == 'normal') {
        //     this.updatedUser = this.students.map((student) => {
        //       if (student.mCurrentBMI >= 13 && student.mCurrentBMI < 18) {
        //         return student;
        //       }
        //     });
        //   }
        //   if (this.mBMIValue == 'over_weight') {
        //     this.updatedUser = this.students.map((student) => {
        //       if (student.mCurrentBMI >= 18 && student.mCurrentBMI < 20) {
        //         return student;
        //       }
        //     });
        //   }

        //   if (this.mBMIValue == 'severly_over_weight') {
        //     this.updatedUser = this.students.map((student) => {
        //       if (student.mCurrentBMI > 20) {
        //         return student;
        //       }
        //     });
        //   }
        // }
      },
      (err) => {
        this.openSnackBar(err.error.msg);
      }
    );
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }
}
