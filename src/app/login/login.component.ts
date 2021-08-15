import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { BackendService } from "../backend.service";

export interface LoginRes {
  auth: string;
  msg: string;
}
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  email: string = "";
  password: string = "";
  ngOnInit(): void {}

  handleSubmit(f: any) {

    this.backendService.login(f.value.uname, f.value.psw).subscribe(
      (res) => {
        localStorage.setItem("auth-token", res.auth);
        this.router.navigate(["/"]);
      },
      (err) => {
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
