import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

export interface IPost {
  id: string;
  title: string;
  description: string;
}

// const entityMetadata: EntityMetadataMap = {
//   Post: {
//     entityDispatcherOptions: {
//       optimisticUpdate: true,
//       optimisticDelete: true,
//     },
//   },
// };

export const EntityConfig: EntityDataModuleConfig = {
  // entityMetadata,
};
