import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventories } from '../inventories';
import { MockApiService } from '../../API-Service/mock-api.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-mock-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mock-details.component.html',
  styleUrl: './mock-details.component.css'
})
export class MockDetailsComponent implements OnInit {
  mockDetails!: Inventories
  private destroy$ = new Subject<void>();
  paramsId: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private mock: MockApiService) {
    this.route.params.subscribe((item) => {
      if (item['id']) {
        this.paramsId = +item['id'];
      }
    });
  }

  ngOnInit(): void {
    this.getDetails()
  }

  goBack() {
    this.location.back();
  }

  getDetails() {
    this.isLoading = true;
    this.mock.getMockInventoriesById(this.paramsId).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Inventories) => {
          this.mockDetails = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          alert(err.error.message);
        }
      })
  }
}
