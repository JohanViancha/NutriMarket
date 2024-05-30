import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShAlertComponent } from './sh-alert.component';

describe('ShAlertComponent', () => {
  let component: ShAlertComponent;
  let fixture: ComponentFixture<ShAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
