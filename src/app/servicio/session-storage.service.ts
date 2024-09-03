import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getItem(key: string): any {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;  // Deserializa con JSON.parse
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));  // Almacena como JSON
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
