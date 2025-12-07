import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/CommonService/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  list: any[];
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  private subscription!: Subscription;

  constructor(private httpService: CommonService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    this.isError = false;
    this.subscription = this.httpService.getTodos()
      .subscribe({
        next: (data: any) => {
          this.list = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.log('error', error);
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = error.message;
        }
      });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      // alert('Dashboard cleard');
    }
  }

}
