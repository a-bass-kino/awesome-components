import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../core/models/comment';
import { MaterialModule } from '../../material.module';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-comments',
  imports: [
    MaterialModule,
    SharedModule,
    NgFor,
    NgIf,
    DatePipe,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[]

  commentControl!: FormControl;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.commentControl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
  }

  onLeaveComment() {
  }

}
