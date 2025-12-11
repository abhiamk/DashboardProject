import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSignalComponent } from './demo-signal.component';

describe('DemoSignalComponent', () => {
  let component: DemoSignalComponent;
  let fixture: ComponentFixture<DemoSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoSignalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
