type Post = {
    id: number;
    title: string;
    topic: string;
    content: string;
    authorId: number;
    createdAt: string;
}

type Author = {
    id: number;
    name: string;
    email: string;
    image: string;
}

type PostComment = {
    id: number;
    postId: number;
    content: string;
    authorId: number;
    createdAt: string;
}