type User = {
    id?: string;
    email: string;
    recovery_email?: string;
    password: string;
    refresh_token: string;
    verify_token: string;
    logged_at?: Date;
    created_at: Date;
    updated_at?: Date;
};
