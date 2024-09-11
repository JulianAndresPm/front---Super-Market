import { TestBed } from '@angular/core/testing';
import { AuthUsuariosService } from './auth.usuarios.service';
describe('AuthUsuariosTsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthUsuariosService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth.usuarios.service.spec.js.map