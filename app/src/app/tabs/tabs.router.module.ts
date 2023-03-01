import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule),
          },
          {
            path: 'profile/:id',
            loadChildren: () =>
              import('../profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
          {
            path: 'events',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('../events/events.module').then(
                    (m) => m.EventsPageModule
                  ),
              },
              {
                path: 'profile/:id',
                children: [
                  {
                    path: '',
                    loadChildren: () =>
                      import('../eventprofile/eventprofile.module').then(
                        (m) => m.EventProfilePageModule
                      ),
                  },
                  {
                    path: 'calendar/:event/:ids',
                    loadChildren: () =>
                      import('../calendar/calendar.module').then(
                        (m) => m.CalendarPageModule
                      ),
                  },
                  {
                    path: 'stats/:event/:ids',
                    loadChildren: () =>
                      import('../stats/stats.module').then(
                        (m) => m.StatsPageModule
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../calendar/calendar.module').then(
                (m) => m.CalendarPageModule
              ),
          },
          {
            path: 'profile/:id',
            loadChildren: () =>
              import('../profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../stats/stats.module').then((m) => m.StatsPageModule),
          },
        ],
      },
      {
        path: 'check-in',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../checkin/checkin.module').then((m) => m.CheckInPageModule),
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(
                (m) => m.SettingsPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
