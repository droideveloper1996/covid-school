import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LoginRes } from "./login/login.component";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  URL = "http://localhost:4300/api/";
  constructor(private http: HttpClient) {}

  login(mEmail: string, mPassword: string) {
    const payload = {
      mEmail,
      mPassword,
    };
    console.log(payload);
    return this.http
      .post<LoginRes>("http://localhost:4300/api/common/login", payload)
      .pipe(map((res) => res));
  }

  addStudent(payload: any) {
    console.log(payload);
    return this.http
      .post<LoginRes>(
        "http://localhost:4300/api/principal/createNewStudent",
        payload
      )
      .pipe(map((res) => res));
  }
}
