import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post';
import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CommentsComponent } from '../../../shared/components/comment/comments.component';
import { CommentBisComponent } from '../../../shared/components/comment-bis/comment-bis.component';

@Component({
  selector: 'app-post-list-item',
  imports: [
    SharedModule,
    CommentBisComponent,
    TitleCasePipe,
    NgIf,
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();

  tempUser = { firstName: 'Abe', lastName:'Ass'}

  constructor() {}

  ngOnInit(): void {
  }

  onNewComment(comment: string) {
    console.log(comment)
    this.postCommented.emit({ comment, postId:this.post.id })
  }
}

/*
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-post-list-item',
  imports: [
    SharedModule,
    MaterialModule,
    TitleCasePipe,
    DatePipe,
    NgIf,
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent implements OnInit {

  @Input() set post(value: Post) {
    if (value) {
      console.log('Post received:', value);
      this.touse = value
    }
  }

  touse!: Post

  constructor() {
  }

  ngOnInit(): void {
  }
}

*/