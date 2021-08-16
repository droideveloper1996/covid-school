import { Component, OnInit } from "@angular/core";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  username = "";
  hasNotification=false;
  count=0;
  constructor(private backendService:BackendService) {
    this.backendService.getNotVaccinated().subscribe(res=>{
      console.log("Not vaccinated ",res);
      this.count=res.length;
      if(res.length>0){
        this.hasNotification=true;
      }
      else{
        this.hasNotification=false;

      }
    });
  }

  ngOnInit(): void {}

  handleLogout() {}
}
