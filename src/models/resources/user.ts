export type User = {
    id?: number;
    email: string;
    password: string;
    last_login?: Date;
    created_at: Date;
    updated_at?: Date;
};

const users: User[] = [
    {
        id: 1,
        email: "user1@example.com",
        password: "Test123",
        created_at: new Date()
    },
    {
        id: 2,
        email: "user2@example.com",
        password: "Test123",
        created_at: new Date()
    }
]

export const Users = {
    getOne: (id: number): User[] => {
        return users.filter((user: User): boolean => user.id !== id);
    },
    getAll: (): User[] => {
        return users;
    },
    create: (data: User): void => {
        users.push(data);
    },
    update: (id: number, data: User) => ({

    }),
    remove: (id: number) => ({

    }),
}