import { TestBed } from '@angular/core/testing';
import { RegistrarComponent } from './registrar.component';
describe('RegistrarComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistrarComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RegistrarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=registrar.component.spec.js.map