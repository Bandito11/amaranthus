import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
  // { path: 'events', loadChildren: './events/events-home/events.module#EventsPageModule' },
  // { path: 'profile/:id', loadChildren: './studentprofile/studentprofile.module#StudentProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
