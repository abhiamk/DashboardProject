import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-client-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './details-client-dashboard.component.html',
  styleUrl: './details-client-dashboard.component.css'
})
export class DetailsClientDashboardComponent {
  detailsId: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.detailsId = id;
    });
  }

  navBack() {
    this.router.navigateByUrl('dashboard');
  }
}
