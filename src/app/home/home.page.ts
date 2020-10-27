import { Component } from "@angular/core";
import { CommonService } from "../common.function";
import { ApiService } from "../api.service";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  userLoggedIn: any;
  LoggedIn = false;
  constructor(
    public config: CommonService,
    private apiService: ApiService,
    private plt: Platform
  ) {
    this.userLoggedIn = this.config.storageGet("LoggedIn");

    if (this.userLoggedIn === "LoggedIn") {
      this.LoggedIn = true;
    } else {
      this.LoggedIn = false;
    }
  }

  openPage(val) {
    if (val === "1") {
      this.config.navigate("stock-adjust-view");
    } else if (val === "2") {
      this.config.navigate("settings");
    } else if (val === "3") {
      this.config.storageClear();
      this.config.navigate("login");
    } else if (val === "4") {
      this.config.navigate("login");
    }
  }
}
