import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPopupComponent } from './mock-popup.component';

describe('MockPopupComponent', () => {
  let component: MockPopupComponent;
  let fixture: ComponentFixture<MockPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
