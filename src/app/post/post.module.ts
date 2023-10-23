import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './services/post.service';
import { PostResolver } from './services/post.resolver';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { PostDataService } from './services/post-data.service';
import { IPost } from '../store/post-entity-metadata';

const entityMetadata: EntityMetadataMap = {
  Post: {
    // selectId: (post: IPost) => post.id,
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
};

function sortByName(a: IPost, b: IPost): number {
  return a.title.localeCompare(b.title);
}

@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    AddPostComponent,
    UpdatePostComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PostRoutingModule],
  providers: [PostService, PostResolver, PostDataService],
})
export class PostModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    postDataService: PostDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', postDataService); // <-- register it
  }
}
