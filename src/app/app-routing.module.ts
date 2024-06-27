import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  { path: 'pages/home', component: HomeComponent },
  { path: 'pages/list', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
