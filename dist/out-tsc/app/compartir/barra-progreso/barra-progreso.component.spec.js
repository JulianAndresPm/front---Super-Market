import { TestBed } from '@angular/core/testing';
import { BarraProgresoComponent } from './barra-progreso.component';
describe('BarraProgresoComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BarraProgresoComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(BarraProgresoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=barra-progreso.component.spec.js.map