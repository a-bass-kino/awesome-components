import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Comment } from '../../../core/models/comment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-bis',
  imports: [
    SharedModule,
    NgFor,
    NgIf
  ],
  templateUrl: './comment-bis.component.html',
  styleUrl: './comment-bis.component.scss'
})
export class CommentBisComponent {

  @Input() comments!: Comment[]
  @Output() newComment = new EventEmitter<string>();

  commentControl!: FormControl;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.commentControl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
  }

  onLeaveComment() {
    if (this.commentControl.invalid) {
      return;
    }
    this.newComment.emit(this.commentControl.value);

    this.commentControl.reset();
  }

}
