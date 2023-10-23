import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/post/services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent {
  postForm!: FormGroup;
  postId!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.postId = this.route.snapshot.params['id'];
    this.createForm();
    this.postService.entities$.subscribe({
      next: (posts) => {
        const post = posts.find((item) => item.id == this.postId) || null;
        this.postForm.reset();
        this.postForm.patchValue({
          id: post?.id,
          title: post?.title,
          description: post?.description,
        });
      },
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onUpdatePost() {
    this.postService.update(this.postForm.value).subscribe({
      next: () => {
        this.postForm.reset();
        this.router.navigate(['/post']);
      },
    });
  }

  showErrors(formProperty: string): string {
    const controler: any = this.postForm.controls[formProperty];
    if ((controler.touched || controler.dirty) && controler.errors) {
      if (controler.errors['required']) {
        return `${formProperty} must required`;
      } else if (controler.errors['minlength']) {
        return `${formProperty} have Insufficient Length`;
      }
      return '';
    }
    return '';
  }
}
