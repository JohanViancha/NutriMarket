import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShHeaderComponent } from './sh-header.component';

describe('ShHeaderComponent', () => {
  let component: ShHeaderComponent;
  let fixture: ComponentFixture<ShHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
