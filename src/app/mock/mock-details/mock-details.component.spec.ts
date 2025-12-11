import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDetailsComponent } from './mock-details.component';

describe('MockDetailsComponent', () => {
  let component: MockDetailsComponent;
  let fixture: ComponentFixture<MockDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
