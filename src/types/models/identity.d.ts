interface Identity {
    identities_id: UUID;
    user_id: UUID;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_date: Date;
    social_number: string;
    created_at: Date;
    updated_at?: Date;
}
