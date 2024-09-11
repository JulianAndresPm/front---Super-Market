import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';
describe('CarritoService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CarritoService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=carrito.service.spec.js.map