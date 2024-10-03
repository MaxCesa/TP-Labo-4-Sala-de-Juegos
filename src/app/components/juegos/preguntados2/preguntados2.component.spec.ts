import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preguntados2Component } from './preguntados2.component';

describe('Preguntados2Component', () => {
  let component: Preguntados2Component;
  let fixture: ComponentFixture<Preguntados2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preguntados2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Preguntados2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
