interface Player extends Identity {
    id?: UUID;
    team_id: UUID;
    nickname: string;
    number: number;
    position: "PG" | "SG" | "SF" | "PF" | "C";
    height: number;
    weight: number;
    wingspan: number;
    main_hand: string;
}
