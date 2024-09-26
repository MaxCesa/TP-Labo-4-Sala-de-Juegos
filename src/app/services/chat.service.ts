import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firebaseConfig } from '../../enviroments/enviroments';

export interface Message {
  id?: string;
  content: string;
  sender: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private db = getFirestore(initializeApp(firebaseConfig));

  constructor() {}

  async sendMessage(message: Message): Promise<void> {
    const messagesCollection = collection(this.db, 'messages');
    await addDoc(messagesCollection, {
      ...message,
      timestamp: new Date(),
    });
  }

  getMessages(): Observable<Message[]> {
    const messagesCollection = collection(this.db, 'messages');
    const q = query(messagesCollection, orderBy('timestamp'));
    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages: Message[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Message)
        );
        observer.next(messages);
      });
      return { unsubscribe };
    });
  }
}
