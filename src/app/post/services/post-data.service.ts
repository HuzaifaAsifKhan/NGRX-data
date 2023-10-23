import { Injectable } from '@angular/core';
import { IPost } from '../../store/post-entity-metadata';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Update } from '@ngrx/entity';
@Injectable()
export class PostDataService extends DefaultDataService<IPost> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Hero', http, httpUrlGenerator);
  }

  override getAll(): Observable<IPost[]> {
    // return super
    //   .getAll()
    //   .pipe(map((posts: any) => posts.map((post: any) => this.mapHero(post))));

    return this.http
      .get<IPost[]>(
        'https://rtf-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((data) => {
          const posts: IPost[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  override add = (post: IPost): Observable<IPost> => {
    return this.http
      .post<{ name: string }>(
        'https://rtf-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  };

  override update = (post: Update<IPost>): Observable<IPost> => {
    console.log(post.changes);
    return this.http.put<IPost>(
      `https://rtf-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json`,
      { ...post.changes }
    );
  };
  override delete = (id: string): Observable<string> => {
    return this.http
      .delete<any>(
        `https://rtf-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`
      )
      .pipe(map(() => id));
  };

  //   getById(id: string | number): Observable<IPost> {
  //     return super.getById(id).pipe(map(hero => this.mapHero(hero)));
  //   }

  //   getWithQuery(params: string | QueryParams): Observable<IPost[]> {
  //     return super.getWithQuery(params).pipe(map(heroes => heroes.map(hero => this.mapHero(hero))));
  //   }

  private mapHero(post: IPost): any {
    return { ...post, dateLoaded: new Date() };
  }
}
