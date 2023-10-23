import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, first, map, mergeMap, of, tap } from 'rxjs';
import { PostService } from './post.service';

@Injectable()
export class PostResolver implements Resolve<boolean> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // return this.postService.loaded$.pipe(
    //   mergeMap((loaded) => {
    //     if (loaded) {
    //       return of(true);
    //     }
    //     return this.postService.getAll().pipe(
    //       map((post: any) => {
    //         return !!post;
    //       })
    //     );
    //   }),
    //   first()
    // );
    return this.postService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.postService.getAll();
        }
      })
      // first()
    );
  }
}
