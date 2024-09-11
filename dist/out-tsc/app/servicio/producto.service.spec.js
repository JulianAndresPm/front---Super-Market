import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto.service';
describe('ProductoService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductoService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=producto.service.spec.js.map