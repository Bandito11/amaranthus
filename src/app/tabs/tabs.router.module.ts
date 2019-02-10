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
            loadChildren: '../home/home.module#HomePageModule'
          },
          {
            path: 'profile/:id',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          },
          {
            path: 'events',
            children: [
              {
                path: '',
                loadChildren: '../events/events.module#EventsPageModule'
              },
              {
                path: 'profile/:id',
                children: [
                  {
                    path: '',
                    loadChildren: '../eventprofile/eventprofile.module#EventProfilePageModule'
                  },
                  {
                    path: 'calendar/:event/:ids',
                    loadChildren: '../calendar/calendar.module#CalendarPageModule'
                  },
                  {
                    path: 'stats/:event/:ids',
                    loadChildren: '../stats/stats.module#StatsPageModule'
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: '../calendar/calendar.module#CalendarPageModule'
          }
        ]
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: '../stats/stats.module#StatsPageModule'
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
            loadChildren: '../profile/profile.module#ProfilePageModule'
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
export class TabsPageRoutingModule { }
