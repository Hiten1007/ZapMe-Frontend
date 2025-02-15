export interface User {
   userInfo : {
    id: number;
    username: string;
    email: string;
    name: string;
    about: string;
    attributes: string[];
    imageUrl : string
   }
  }

  interface Message {
   content: string;
   createdAt: string;
 }
 
 export interface AUser {
   id: number;
   username: string;
   imageUrl: string;
   name:string;
 }
 
 interface ChatUser {
   userId: number;
   chatId: number;
   user: User;
 }
 
 export interface Chat {
   id: number;
   chatId: string;
   isGroup: boolean;
   groupName?: string | null;
   latestMessageAt?: string | null;
   messages: Message[];
   otherUser: AUser;
   users: ChatUser[];
 }