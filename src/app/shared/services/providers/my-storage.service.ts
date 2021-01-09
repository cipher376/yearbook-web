import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

export interface StorageInterface {

  set(key: string, value);
  setObject(key: string, object: Object);
  get(key: string);
  getObject(key: string);
  remove(key: string);
  clear();

}



@Injectable({
  providedIn: 'root'
})
export class MyStorage implements StorageInterface {

  constructor(
    private storage: LocalStorageService,
    private sessionStore: SessionStorageService
    ) {
  }

  /**************************ENABLE FOR WEB************************/
  set(key: string, value) {
    return this.storage.store(key, value);
  }

  setObject(key: string, object: Object) {
    return this.storage.store(key, JSON.stringify(object));
  }

  get(key: string) {
    return this.storage.retrieve(key);
  }

  getObject(key: string) {
    const result = this.storage.retrieve(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  remove(key: string) {
    this.storage.clear(key);
  }

  clear() {
    this.storage.clear();
  }

}
