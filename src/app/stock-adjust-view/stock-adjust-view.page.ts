import { Component, OnInit } from "@angular/core";
import { CommonService } from "../common.function";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { LoadingController, NavController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { Platform } from "@ionic/angular";
import { AlertController } from '@ionic/angular';


@Component({
  selector: "app-stock-adjust-view",
  templateUrl: "./stock-adjust-view.page.html",
  styleUrls: ["./stock-adjust-view.page.scss"],
})
export class StockAdjustViewPage implements OnInit {
  addedStock: boolean = true;
  invoice: any;
  note: any;
  selectedIndex: any;
  selectedStock: any;
  uniqueId: any;
  stockEditable = false;
  isStockEditable: boolean = false;
  data_to_display = false;
  searchInput: any;
  searchData: any;
  stock_details_data: any;
  Selected_Item_to_add: any;
  ItemsAddArray:any;

  stock_details = [
    {
      Unique: "1",
      Created: "2020-10-19",
      Invoice: "One",
      Notes: "Lorem",
      Status: 1,
    },
    {
      Unique: "2",
      Created: "2020-10-16",
      Invoice: "Two",
      Notes: "Lorem",
      Status: 1,
    },
    {
      Unique: "3",
      Created: "2020-10-15",
      Invoice: "Three",
      Notes: "Lorem",
      Status: 2,
    },
  ];

  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public config: CommonService,
    private plt: Platform,
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });

   console.log(this.getLocalData("stocks")['__zone_symbol__value']); 
  //  console.log(JSON.parse(this.getLocalData("stocks"))); 
    // Get cached API result

   let var2 = this.getLocalData("stocks")['__zone_symbol__value']; 
    console.log(JSON.parse(var2));
      this.stock_details_data = this.stock_details;
  }

  private getLocalData(key) {
    //  this.config.storageGet(`${key}`);
    return this.config.storageGet(key);
  }
  loadData(refresh = false, refresher?) {
    let Ser = this.apiService.getUsers(refresh);
    console.log("Results" + JSON.stringify(Ser));
    // this.apiService.getUsers(refresh).subscribe((res) => {
    //   console.log("Data Loaded" + JSON.stringify(res));

    //   if (refresher) {
    //     refresher.target.complete();
    //   }
    // });
  }

  setRow(_index: number, data) {
    this.isStockEditable = false;
    this.selectedIndex = _index;
    this.selectedStock = data;
    this.stockEditable = true;
  }

  goBack() {
    this.isStockEditable = false;
    this.config.navigate("home");
  }

  NewStock() {
    this.isStockEditable = false;
    this.addedStock = false;
  }

  EditStock() {
    this.isStockEditable = true;
    this.addedStock = false;
    console.log("??" + JSON.stringify(this.selectedStock));
    this.note = this.selectedStock.Notes;
    this.invoice = this.selectedStock.Invoice;
    this.uniqueId = this.selectedStock.Unique;
  }

  Close() {
    this.isStockEditable = false;
    this.addedStock = true;
  }

  SearchItem() {

    this.searchData = [
      {
        Item: "1",
        Barcode: "Lorem",
        Description: "Lorem Ipsum the demo content",
      },
      {
        Item: "2",
        Barcode: "Lorem",
        Description: "Lorem Ipsum the demo content",
      },
      {
        Item: "3",
        Barcode: "Lorem",
        Description: "Lorem Ipsum the demo content",
      },
    ];

    if (this.searchData.length >= 1) {
      this.data_to_display = true;
    }
  }

  selectItem(_index: number, data) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;
  }

  ClearSearch() {
    this.searchInput = "";
    this.searchData = [];
    this.data_to_display = false;
  }

  filterBy(val) {
    if (val === "1") {
      let pending = 1;
      this.stock_details = this.stock_details_data;
      let newarr = this.stock_details.filter((data) => data.Status === pending);
      this.stock_details = newarr;
    }
    if (val === "2") {
      let completed = 2;
      this.stock_details = this.stock_details_data;
      let newarr = this.stock_details.filter(
        (data) => data.Status === completed
      );
      this.stock_details = newarr;
    }
    if (val === "3") {
      this.stock_details = [];
      this.stock_details = this.stock_details_data;
    }
  }

  async AddNewItem() {

    console.log(this.Selected_Item_to_add);
    if (this.Selected_Item_to_add != undefined) {
      let refresh = false;
      console.log(JSON.stringify(this.Selected_Item_to_add));
  
      this.config.storageSave('note', this.note);
      this.config.storageSave('invoice', this.invoice);
  
      let todayDate = new Date().getTime()
      this.ItemsAddArray = [
        {
          Created: todayDate,
          Invoice: this.invoice,
          Notes: this.note,
        },
      ];
  
    console.log('DATA 1'+ JSON.stringify(this.ItemsAddArray));

       this.ItemsAddArray.Items.push({
    
        Item: this.Selected_Item_to_add.Item,
        Barcode: this.Selected_Item_to_add.Barcode,
        Description: this.Selected_Item_to_add.Description,
     
      });
  
      console.log('DATA 2'+ JSON.stringify(this.ItemsAddArray));

      this.config.storageSave("newInventoryToSave", this.ItemsAddArray);

    }

    else{
      this.presentAlert('Select an Item to Add');
    }
    }

    async presentAlert(s) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: s,
        buttons: ['OK']
      });
  
      await alert.present();
    }

 
}
