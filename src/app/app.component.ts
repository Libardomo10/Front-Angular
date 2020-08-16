import { Component, OnInit } from '@angular/core';
import { ApiService } from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit{
  listLocation: any[];
  listParentLoc: any[];
  listInternalLoc: any[];
  formLocation: any;
  showTable: boolean = false;

  constructor(private httpService: ApiService) {

  }

  ngOnInit() {
    this.locations();
    this.formLocation = {
      id: 0,
      nameLocation: '',
      area_m2: 0,
      locInternal: false,
      idInternalLocation: 0
    }
  }

  public locations() {
    this.listLocation = [];
    this.listParentLoc = [];
    this.listInternalLoc = [];
    this.httpService.listLocation().subscribe(
      (resp: any) => {
        if (resp != null) {
          this.listLocation = resp;
          var show = false;
          for (let i = 0; i < this.listLocation.length; i++) {
            const element = this.listLocation[i];
            element.show = show;
            if (this.listLocation[i].idInternalLocation == 0) {
              this.listParentLoc.push(this.listLocation[i]);
            } else if (element.idInternalLocation != 0) {
              this.listInternalLoc.push(this.listLocation[i]);
            }
          }
          console.log(this.listLocation);
          console.log(this.listParentLoc);
          console.log(this.listInternalLoc);
        } else {
          console.log("Ocurrio un error");
          
        }
      }
    );
  }

  public showInternalLoc(showTable) {
    this.showTable = showTable;
  }

  public addLocation(data: any) {
    this.httpService.addLocation(data).subscribe(
      (resp: any) => {
        if (resp.success) {
          console.log("Correctamente insertado.");
          this.ngOnInit();          
        } else {
          console.log("Correctamente insertado.");
        }
      }
    );
  }

  public setEdit(data: any) {
    this.formLocation.id = data.id;
    this.formLocation.nameLocation = data.nameLocation;
    this.formLocation.area_m2 = data.area_m2;

    if (data.idInternalLocation == 0) {
      this.formLocation.locInternal = false;
      this.formLocation.idInternalLocation = 0;
    } else {
      this.formLocation.locInternal = true;
      this.formLocation.idInternalLocation = data.idInternalLocation;
    }
  }


}
