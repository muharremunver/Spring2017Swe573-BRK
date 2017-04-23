import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlacePageComponent } from './place-page/place-page.component';
import { ProfileComponent } from './profile/profile.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'map', component: MapComponent },
    { path: 'places', component: PlaceListComponent },
    { path: 'place', component: PlacePageComponent },
    { path: 'profile', component: ProfileComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);