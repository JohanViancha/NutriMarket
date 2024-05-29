import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShInputComponent } from './sh-input.component';

describe('ShInputComponent', () => {
  let component: ShInputComponent;
  let fixture: ComponentFixture<ShInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
