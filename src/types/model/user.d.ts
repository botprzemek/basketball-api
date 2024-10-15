interface User extends Identity {
    id?: string;
    username: string;
    recovery_email: string;
    password: string;
    refresh_token: string;
    verification_token: string;
}
