const enum Position {
    PG,
    SG,
    SF,
    PF,
    C,
}

type Player = {
    id: number;
    team_id: number;
    name: string;
    lastname: string;
    number: number;
    height: number;
    position: Position;
    birth_date: Date;
    starter: boolean;
};
