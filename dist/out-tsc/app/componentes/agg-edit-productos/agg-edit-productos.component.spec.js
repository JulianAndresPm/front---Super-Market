import { TestBed } from '@angular/core/testing';
import { AggEditProductosComponent } from './agg-edit-productos.component';
describe('AggEditProductosComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggEditProductosComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AggEditProductosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=agg-edit-productos.component.spec.js.map