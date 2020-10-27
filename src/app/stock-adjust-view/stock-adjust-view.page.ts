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
  added_items: any;

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
    // Get cached API result

   let var2 = this.getLocalData("stocks")['__zone_symbol__value']; 
    console.log(JSON.parse(var2));
      this.stock_details_data = this.stock_details;
  }

  private getLocalData(key) {
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

    let dataAdd = [
      {
        Unique:'',
        Date: '',
        Invoice: '',
        Note: '',
        Items : 

          this.added_items

        
      }
    ];

    console.log(dataAdd);

    
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
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Do you want to save your changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.isStockEditable = false;
            this.addedStock = true;
            this.config.storageRemoveItem('newInvoiceAdd');
            this.config.storageRemoveItem('invoice');
            this.config.storageRemoveItem('note');

          }
        }
      ]
    });

    await alert.present();
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
      console.log('incoice'+this.invoice);
      
      this.config.storageSave('invoice', this.invoice);
      this.config.storageSave('note', this.note);

    }
  }

  selectItem(_index: number, data) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;
  }

  ClearSearch() {
    
    console.log(this.added_items);
    console.log('dsdf');
    
    this.searchInput = "";
    this.searchData = [];
    this.data_to_display = false;

    
    // this.config.storageClear();
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


      let var2 = this.getLocalData("newInvoiceAdd")['__zone_symbol__value']; 
      console.log(JSON.parse(var2));
      
       if(var2 != null){
  
        console.log('Condition True--- Two +'+var2.length);
  
        console.log(this.getLocalData("newInvoiceAdd"));
        
  
        let arr1 = JSON.parse(this.getLocalData("newInvoiceAdd")['__zone_symbol__value']); 
        let arr2 = [{Item:this.Selected_Item_to_add.Item, Barcode:this.Selected_Item_to_add.Barcode , Description: this.Selected_Item_to_add.Description}];
  
        let arr3 = [ ...arr1, ...arr2]
  
        console.log(arr1);
        console.log(arr2);
        
  
  console.log('CONCAT---------'+JSON.stringify(arr3));

  console.log('CONCAT---------'+JSON.parse(JSON.stringify(arr3)));

  this.config.storageRemoveItem('newInvoiceAdd');
  this.config.storageSave('newInvoiceAdd', arr3);
  // convert the array into an object where key is the array index and value is the value of each element in the array
  let obj = arr3.reduce((prev, current, idx) => {
    prev[idx] = current
    return prev
  }, {});

  console.log('Check for object'+JSON.stringify(obj));
  
  var object1 = arr3;
  let object2 = [];
  object2.push(arr3);
  this.added_items = object2['0'];

  
      }

    else if(var2 == null){

      console.log('Condition True--- One +'+var2);

      let arr1 = [{Item:this.Selected_Item_to_add.Item, Barcode:this.Selected_Item_to_add.Barcode , Description: this.Selected_Item_to_add.Description}]
      this.config.storageSave('newInvoiceAdd', arr1);
      this.config.storageSave('invoice', this.invoice);
      this.config.storageSave('note', this.note);
    }

   
       // first array

// then save in local



// then retreive from it

// then add new item to the retreived one


// concat

// save new and remove old

// second array

// concat arr1 and arr2



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




    filterItems(event) {

      const val = event.target.value;
      this.stock_details = this.stock_details_data;


      this.stock_details = this.stock_details.filter((item) => {
        return ((item.Invoice.toLowerCase().indexOf(val.toLowerCase()) > -1) || 
    (item.Notes .toLowerCase().indexOf(val.toLowerCase()) > -1) );
      })
      console.log(this.stock_details);
      
    }

    

 
}

export interface ResProject {

  Unique: string; 
  Created: string; 
  Invoice: string; 
  Notes: string; 
  Status: number; 
}

