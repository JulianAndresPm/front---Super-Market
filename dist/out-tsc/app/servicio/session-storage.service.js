import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let SessionStorageService = class SessionStorageService {
    constructor() { }
    getItem(key) {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null; // Deserializa con JSON.parse
    }
    setItem(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value)); // Almacena como JSON
    }
    removeItem(key) {
        sessionStorage.removeItem(key);
    }
};
SessionStorageService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SessionStorageService);
export { SessionStorageService };
//# sourceMappingURL=session-storage.service.js.map