import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, Message } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  sender: string = localStorage.getItem('user') || 'Guest';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage({
        content: this.newMessage,
        sender: this.sender,
        timestamp: new Date(),
      });
      this.newMessage = '';
    }
  }
}
