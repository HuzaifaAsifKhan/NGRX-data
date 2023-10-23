import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  // {
  //   path: 'counter',
  //   loadChildren: () =>
  //     import('./counter/counter.module').then((m) => m.CounterModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
