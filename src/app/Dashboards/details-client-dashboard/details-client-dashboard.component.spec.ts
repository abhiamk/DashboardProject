import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsClientDashboardComponent } from './details-client-dashboard.component';

describe('DetailsClientDashboardComponent', () => {
  let component: DetailsClientDashboardComponent;
  let fixture: ComponentFixture<DetailsClientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsClientDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsClientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
