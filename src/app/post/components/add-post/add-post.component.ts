import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/post/services/post.service';
import { IPost } from 'src/app/store/post-entity-metadata';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  postForm!: FormGroup;

  constructor(private postService: PostService) {
    this.postForm = new FormGroup({
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

  onAddPost() {
    const post: IPost = this.postForm.value;
    this.postService.add(post).subscribe({
      next: () => {
        this.postForm.reset();
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
