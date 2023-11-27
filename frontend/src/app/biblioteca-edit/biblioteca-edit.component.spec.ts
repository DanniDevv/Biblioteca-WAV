import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BibliotecaEditComponent } from './biblioteca-edit.component';

describe('BibliotecaEditComponent', () => {
  let component: BibliotecaEditComponent;
  let fixture: ComponentFixture<BibliotecaEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BibliotecaEditComponent]
    });
    fixture = TestBed.createComponent(BibliotecaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
