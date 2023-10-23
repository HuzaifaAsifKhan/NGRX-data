import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostResolver } from './services/post.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    resolve: { posts: PostResolver },
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      },
      {
        path: 'edit/:id',
        component: UpdatePostComponent,
      },
    ],
  },
  {
    path: 'detail/:id',
    component: PostDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
