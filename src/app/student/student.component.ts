import { Component, OnInit } from "@angular/core";
import { Form } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {
  constructor(
    private service: BackendService,
    private _snackBar: MatSnackBar
  ) {}

  mFirstName: string = "";
  mLastName = "";
  mIdNumber = "";
  mClass = "";
  mSection = "";
  mPhone = "";
  mAddress = "";
  mMotherID = "";
  mFatherID = "";
  ngOnInit(): void {}
  handleSubmit(f: any) {
    this.service.addStudent(f.value).subscribe(
      (res) => {
        if (res) {
          console.log;
          this.openSnackBar("Student was added sucessfully");
          window.location.reload();
        }
      },
      (err) => {
        console.log(err.error);
        this.openSnackBar(err.error.msg);
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 1000,
    });
  }
}
