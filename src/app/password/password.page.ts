import { Component, OnInit } from "@angular/core";
import { CommonService } from "../common.function";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { LoadingController, NavController } from "@ionic/angular";

@Component({
  selector: "app-password",
  templateUrl: "./password.page.html",
  styleUrls: ["./password.page.scss"],
})
export class PasswordPage implements OnInit {
  form_detail: any;
  message = "Error Success Message placeholder";

  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public config: CommonService
  ) {}

  ngOnInit() {
    this.form_detail = this.fb.group({
      username: ["", Validators.required],
    });
  }

  async Reset_() {
    let Loading_ = await this.loadingController.create({
      message: "Please wait...",
      translucent: true,
      cssClass: "custom-class custom-loading",
    });
    await Loading_.present();

    let send = {
      username: this.form_detail.value.username,
      device_token: "",
      device_os: "",
    };

    // await this.api.Login("login", send).subscribe(
    //   (res) => {
    //     Loading_.dismiss();
    //     this.message = res["message"];

    //     if (this.message == "LoggedIn") {
    //       this.config.storageSave("LoggedIn", "LoggedIn");
    //       this.config.navigate("home");
    //     }
    //   },
    //   (err) => {
    //     Loading_.dismiss();
    //     // (err);
    //   }
    // );
  }

  goToLogin() {
    this.navCtrl.navigateForward("/login");
  }
}
