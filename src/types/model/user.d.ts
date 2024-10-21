interface User extends Identity {
    id?: UUID;
    tenant_id: UUID;
    username: string;
    recovery_email: string;
    password: string;
    refresh_token: string;
    verification_token: string;
    logged_at: Date;
}
