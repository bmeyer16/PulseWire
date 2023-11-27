import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reply } from './reply.model';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  @Input() reply: any;
  @Output() submitReply = new EventEmitter<string>();
  newReplyContent: string = '';

  submit() {
    this.submitReply.emit(this.newReplyContent);
    this.newReplyContent = '';
  }
}
