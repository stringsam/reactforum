import firebase from "firebase";

export type User = Pick<firebase.User, 'uid'| 'email'>

export type UserDetail = {
    email: string,
    photoUrl?: string,
    phoneNumber?: string,
    sex?: boolean,
    signuature?: string,
    nickname?: string,
}

export type Post = {
    id?: string;
    by: User;
    content: string;
    date: firebase.firestore.Timestamp
}

export type Thread = {
    id?: string,
    by: User
    title: string
    date: firebase.firestore.Timestamp
    posts?: Post[]
}
