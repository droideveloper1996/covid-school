import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-sidebar",
  templateUrl: "./app-sidebar.component.html",
  styleUrls: ["./app-sidebar.component.css"],
})
export class AppSidebarComponent implements OnInit {
  constructor() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("auth-token");

    if (token != null && token != undefined) {
      if (!helper.isTokenExpired(token)) {
      }
    }
  }

  ngOnInit(): void {}
  handleLogout() {}

}
