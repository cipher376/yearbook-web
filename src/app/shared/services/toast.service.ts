import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  constructor() {
  }

  toast(message: any) {
    console.log(JSON.stringify(message));
  }
}
