import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoResultadoEncuestaComponent } from './dialogo-resultado-encuesta.component';

describe('DialogoResultadoEncuestaComponent', () => {
  let component: DialogoResultadoEncuestaComponent;
  let fixture: ComponentFixture<DialogoResultadoEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoResultadoEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoResultadoEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
