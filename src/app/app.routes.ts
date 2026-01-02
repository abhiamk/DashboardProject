import { Routes } from '@angular/router';
import { DashboardComponent } from './Dashboards/dashboard/dashboard.component';
import { AuthGuardGuard } from './Guards/auth-guard.guard';
import { PageNotFoundComponent } from './ErrorPages/page-not-found/page-not-found.component';
import { ClientDashboardComponent } from './Dashboards/client-dashboard/client-dashboard.component';
import { DetailsClientDashboardComponent } from './Dashboards/details-client-dashboard/details-client-dashboard.component';
import { DemoMatTableComponent } from './Dashboards/mat-table/demo-mat-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./AuthComp/auth-comp.module').then(m => m.AuthCompModule) },
  {
    path: '',
    canActivate: [AuthGuardGuard],
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./Dashboards/tab-dashboard/tab-dashboard.component').then(m => m.TabDashboardComponent) },
      { path: 'empDashboard', loadComponent: () => import('./Dashboards/emp-dashboard/emp-dashboard.component').then(m => m.EmpDashboardComponent) },
      {
        path: 'clientDashboard', component: ClientDashboardComponent,
      },
      { path: 'details/:id', component: DetailsClientDashboardComponent },
      {
        path: 'matTable', component: DemoMatTableComponent,
      },
      {
        path: 'Form', loadComponent: () => import('./Dashboards/forms/forms.component').then(m => m.FormsComponent)
      },
      {
        path: 'dynamicData', loadComponent: () => import('./Dashboards/dynamic-dashboard/dynamic-dashboard.component').then(m => m.DynamicDashboardComponent)
      },
      {
        path: 'mock',
        children: [
          { path: '', loadComponent: () => import('./mock/mock.component').then(m => m.MockComponent) },
          { path: ':id', loadComponent: () => import('./mock/mock-details/mock-details.component').then(m => m.MockDetailsComponent) }
        ]
      },
      {
        path: 'signal',
        loadComponent: () => import('./SignalComponent/demo-signal/demo-signal.component').then(m => m.DemoSignalComponent)
      },
      {
        path: 'userSignal',
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent)
      },
      {
        path: 'mock-details/:id',
        loadComponent: () =>
          import('./mock/mock-details/mock-details.component').then(m => m.MockDetailsComponent)
      }

    ]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
