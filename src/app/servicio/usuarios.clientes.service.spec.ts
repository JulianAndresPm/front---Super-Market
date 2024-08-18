import { TestBed } from '@angular/core/testing';

import { UsuariosClientesService } from './usuarios.clientes.service';

describe('UsuariosClientesService', () => {
  let service: UsuariosClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
