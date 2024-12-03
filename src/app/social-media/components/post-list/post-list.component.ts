import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  imports: [
    PostListItemComponent,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  
  posts$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute,
    private service: PostsService
  ) {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    );
  }

  ngOnInit(): void {
  }

  onPostCommented(postCommented: {comment: string, postId: number}): void {
    this.service.newComment(postCommented);
  }
}
