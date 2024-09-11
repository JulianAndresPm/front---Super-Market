import { TestBed } from '@angular/core/testing';
import { UsuariosClientesService } from './usuarios.clientes.service';
describe('UsuariosClientesService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UsuariosClientesService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=usuarios.clientes.service.spec.js.map