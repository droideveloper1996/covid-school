import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LoginRes } from "./login/login.component";
import { Student } from "./vaccine/vaccine.component";

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

  generateReportByClassVaccine(payload:any){
    return this.http
      .get(
        `http://localhost:4300/api/common/vaccinated/${payload.mClass}/${payload.mVaccineName}`,
      )
      .pipe(map((res) => res));
  }


  vaccinateStudent(payload:any){

    console.log(payload)
    return this.http
      .put(
        `http://localhost:4300/api/common/vaccinateStudent`,
       payload
      )
      .pipe(map((res) => res));
  }


getStudentByClass(payload:any){

  return this.http
      .get<[Student]>(
        `http://localhost:4300/api/common/getStudentByClass/${payload.mClass}`,
      )
      .pipe(map((res) => res));
  }

  getAllStudents(){
    return this.http
      .get<[Student]>(
        `http://localhost:4300/api/principal/getStudents`,
      )
      .pipe(map((res) => res));
  }

  getAllVaccinated(){
    return this.http
      .get<[Student]>(
        `http://localhost:4300/api/common/vaccinatedList`,
      )
      .pipe(map((res) => res));
  }

  getNotVaccinated(){
    return this.http
      .get<[Student]>(
        `http://localhost:4300/api/common/notVaccinatedList`,
      )
      .pipe(map((res) => res));
  }     

  getBMIByClass(mClass:String){
    return this.http
    .get<[Student]>(
      `http://localhost:4300/api/common/getBMI/${mClass}`,
    )
    .pipe(map((res) => res));
  }

  getStudentByClassSem( mClass:any, mSem:any){
    return this.http
    .get<[Student]>(
      `http://localhost:4300/api/common/getStudentByClassSem/${mClass}/${mSem}`,
    )
    .pipe(map((res) => res));
  }

  getStudentById(mIdNumber:string){
    return this.http
    .get<[Student]>(
      `http://localhost:4300/api/common/getStudentByClassSem/${mIdNumber}`,
    )
    .pipe(map((res) => res));
  }


updateMedicalLogs(payload:any){
    console.log(payload);
    return this.http
      .post("http://localhost:4300/api/common/setHealthProfile", payload)
      .pipe(map((res) => res));
  }

  
}

