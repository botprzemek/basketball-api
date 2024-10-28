interface Player {
    id?: UUID;
    user_id: UUID;
    team_id: UUID;
    identity: Identity;
    nickname: string;
    number: number;
    position: "PG" | "SG" | "SF" | "PF" | "C";
    height: number;
    weight: number;
    wingspan: number;
    main_hand: string;
}
