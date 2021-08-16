import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BmiComponent } from "./bmi/bmi.component";
import { HealthCardComponent } from './health-card/health-card.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ReportComponent } from "./report/report.component";
import { StudentComponent } from "./student/student.component";
import { VaccineComponent } from "./vaccine/vaccine.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "vaccine", component: VaccineComponent },
  { path: "report", component: ReportComponent },
  { path: "bmi", component: BmiComponent },
  { path: "create", component: StudentComponent },
  { path: "health-card", component: HealthCardComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
