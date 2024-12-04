import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Comment } from '../../../core/models/comment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, animateChild, group, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';

@Component({
  selector: 'app-comment-bis',
  imports: [
    SharedModule,
    NgFor,
    NgIf
  ],
  templateUrl: './comment-bis.component.html',
  styleUrl: './comment-bis.component.scss',
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform:'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform:'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition('void => *', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            time: '500ms',
            flashColor: 'rgb(201, 157, 242)'
          }
        }),
        group([
          useAnimation(flashAnimation, {
            params: {
              time: '1000ms',
              flashColor: 'rgb(249, 179, 111)'
            }
          }),
          query('.comment-text', [
            animate('300ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('750ms', style({
              opacity: 1
            }))
          ]),
        ])
      ])
    ])
  ]
})
export class CommentBisComponent implements OnInit {

  @Input() comments!: Comment[]
  @Output() newComment = new EventEmitter<string>();

  commentControl!: FormControl;
  animationStates: { [key:number]: 'default' | 'active' } = {}

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.commentControl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentControl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id))
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentControl.value,
      createdDate: new Date().toISOString(),
      userId:1
    })
    this.newComment.emit(this.commentControl.value);

    this.commentControl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }

}
