import { Injectable } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  options: any = {};
  Apiurl: any;
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage
  ) {}

  async alert_(m) {
    const alert = await this.alertController.create({
      header: "",
      message: m,

      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            // ('Confirm Cancel: blah');
          },
        },
      ],
    });

    await alert.present();
  }

  async storageSave(name, name1) {
    this.storage.remove(name);
    localStorage.removeItem(name);
    this.storage.set(name, name1);
    localStorage.setItem(name, JSON.stringify(name1));
  }

  async storageClear() {
    this.storage.clear();
    localStorage.clear();
  }

  async storageGet(get) {
    let val2 = localStorage.getItem(get);
    this.storage.get(get).then((val) => {
      let val2 = val;
      return val2;
    });
    return val2;
  }

  async navigate(page) {
    this.navCtrl.navigateForward(page);
  }
}
