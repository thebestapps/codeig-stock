import { Component, OnInit } from "@angular/core";
import { CommonService } from "../common.function";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { LoadingController, NavController } from "@ionic/angular";
import { ApiService } from "../api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  form_detail: any;
  message = "Error Success Message placeholder";

  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public config: CommonService,
    public api: ApiService
  ) {
    this.form_detail = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  async Login_() {
    let Loading_ = await this.loadingController.create({
      message: "Please wait...",
      translucent: true,
      cssClass: "custom-class custom-loading",
    });
    await Loading_.present();

    let send = {
      username: this.form_detail.value.username,
      password: this.form_detail.value.password,
      device_token: "",
      device_os: "",
    };

    this.config.storageSave("LoggedIn", "LoggedIn");
    this.config.navigate("home");
    Loading_.dismiss();
    // await this.api.Login("login", send).subscribe(
    //   (res) => {
    //     Loading_.dismiss();
    //     this.message = res["message"];

    //     if (this.message == "LoggedIn") {
    //
    //       this.config.navigate("home");
    //     }
    //   },
    //   (err) => {
    //     Loading_.dismiss();
    //     // (err);
    //   }
    // );
  }

  forgot_password() {
    this.navCtrl.navigateForward("/password");
  }

  goToHome() {
    this.navCtrl.navigateForward("/home");
  }
}
