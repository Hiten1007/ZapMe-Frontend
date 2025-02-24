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

export  interface Message {
   content: string;
   createdAt: string;
   id:number;
   userId:number;
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
   latestMessageAt?: string | null;
   messages: Message[];
   otherUser: AUser;
   users: ChatUser[];
 }