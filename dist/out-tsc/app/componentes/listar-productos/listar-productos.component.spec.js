import { TestBed } from '@angular/core/testing';
import { ListarProductosComponent } from './listar-productos.component';
describe('ListarProductosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListarProductosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ListarProductosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listar-productos.component.spec.js.map