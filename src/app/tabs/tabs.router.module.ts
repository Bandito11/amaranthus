import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../daily/home/home.module#HomePageModule'
          },
          {
            path: 'profile/:id',
            loadChildren: '../studentprofile/studentprofile.module#StudentProfilePageModule'
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: '../daily/calendar/calendar.module#CalendarPageModule'
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: '../daily/stats/stats.module#StatsPageModule'
          }
        ]
      },
      {
        path: 'roster',
        children: [
          {
            path: '',
            loadChildren: '../student-list/student-list.module#StudentListPageModule'
          },
          {
            path: 'profile/:id',
            loadChildren: '../studentprofile/studentprofile.module#StudentProfilePageModule'
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
