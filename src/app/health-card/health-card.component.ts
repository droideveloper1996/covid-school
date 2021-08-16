import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendService } from '../backend.service';
import { PopupComponent } from '../popup/popup.component';
import { Student } from '../vaccine/vaccine.component';

@Component({
  selector: 'app-health-card',
  templateUrl: './health-card.component.html',
  styleUrls: ['./health-card.component.css'],
})
export class HealthCardComponent implements OnInit {
  hasRetreived = false;
  mClass = '1';
  mSection = '1';
  students: Student[] = [];
  mIdNumber = '';
  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  handleSubmit(f: any) {
    console.log(f.value);

    if (f.value.mIdNumber != '' && f.value.mIdNumber != undefined) {
      this.backendService.getStudentById(f.value.mIdNumber).subscribe(
        (res) => {
          if (res) {
            this.hasRetreived = true;
            this.students = res;
            console.log(res);
          }
        },
        (err) => {
          console.log(err.error.msg);
        }
      );
      return;
    }
    this.backendService
      .getStudentByClassSem(f.value.mClass, f.value.mSection)
      .subscribe((res) => {
        if (res) {
          this.hasRetreived = true;
          this.students = res;
        }
      });
  }

  openPopup(id: string) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '330px',
      height: '400px',
      data: {
        sid: id,
        viewType: 'edit',
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  viewMore(student: Student) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '700px',
      height: '550px',
      data: {
        sid: student,
        viewType: 'summary',
      },
    });
  }
}
