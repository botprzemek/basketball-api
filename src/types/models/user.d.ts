interface User {
    id?: UUID;
    tenant_id: UUID;
    identity: Identity;
    username: string;
    recovery_email: string;
    password: string;
    refresh_token?: string;
    verification_token: string;
    logged_at?: Date;
}
