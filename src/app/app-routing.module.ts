import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./auth/components/login-page/login-page.component";
import {NotFoundComponent} from "./main/components/not-found/not-found.component";
import {AuthGuard} from "./auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'start',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'mood',
    loadChildren: () => import('./mood/mood.module').then(m => m.MoodModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./balance/balance.module').then(m => m.BalanceModule)
  },
  {
    path: 'notebook',
    loadChildren: () => import('./notebook/notebook.module').then(m => m.NotebookModule)
  },
  {
    path: 'numerology',
    loadChildren: () => import('./numerology/numerology.module').then(m => m.NumerologyModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
