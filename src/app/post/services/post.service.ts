import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IPost } from '../../store/post-entity-metadata';

@Injectable()
export class PostService extends EntityCollectionServiceBase<IPost> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Post', serviceElementsFactory);
  }
}
