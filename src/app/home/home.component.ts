import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ChartType, ChartOptions } from "chart.js";
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from "ng2-charts";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [["Vaccinated"], ["Not Vaccinated"]];
  public pieChartLabelsBMI: Label[] = [
    ["Normal"],
    ["Underweight"],
    ["Overweight"],
  ];
  public pieChartDataBMI: SingleDataSet = [30, 45, 25];
  public pieChartDataClassI: SingleDataSet = [300, 500];
  public pieChartDataClassII: SingleDataSet = [500, 500];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private router: Router) {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("auth-token");
    if (token != null && token != undefined) {
      if (!helper.isTokenExpired(token)) {
      } else router.navigate(["/login"]);
    } else {
      router.navigate(["/login"]);
    }
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {}
}
