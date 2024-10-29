interface User extends Identity {
    id: UUID;
    identity_id: UUID;
    username: string;
    password: string;
    recovery_email?: string;
    refresh_token?: string;
    verification_token?: string;
    logged_at?: Date;
    deleted_at?: Date;
    is_deleted?: boolean;
}
