import { Component, OnInit, inject } from '@angular/core';
import { PostService } from './services/post.service';
import { Observable } from 'rxjs';
import { IPost } from '../store/post-entity-metadata';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  posts$!: Observable<IPost[]>;
  // constructor(private postService: PostService) {}
  postService = inject(PostService);

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
  }

  deletePost(id: string) {
    if (confirm('Are you sure')) {
      this.postService.delete(id);
    }
  }
}
