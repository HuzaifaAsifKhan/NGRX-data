import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/post/services/post.service';
import { IPost } from 'src/app/store/post-entity-metadata';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  postId!: string;
  post!: IPost | undefined;
  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.postId = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe({
      next: (posts: IPost[]) => {
        this.post = posts.find((item) => item.id == this.postId) || undefined;
      },
    });
  }
}
