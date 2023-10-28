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