import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShNotifyComponent } from './sh-notify.component';

describe('ShNotifyComponent', () => {
  let component: ShNotifyComponent;
  let fixture: ComponentFixture<ShNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShNotifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
