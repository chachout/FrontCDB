import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormulaireComponent} from './formulaire/formulaire.component';
import { ComputerComponent } from './computer/computer.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'formulaire/add/:addMode',
    component: FormulaireComponent,
    pathMatch: 'full'
  },
  {
    path: 'formulaire/edit/:addMode/:id',
    component: FormulaireComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    component: ComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
