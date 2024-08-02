export const enum Position {
    PG = "PG",
    SG = "SG",
    SF = "SF",
    PF = "PF",
    C = "C",
}

export type Player = {
    id?: number;
    team_id?: number;
    name: string;
    lastname: string;
    nationality: string;
    number: number;
    height: number;
    weight?: number;
    wingspan?: number;
    position: Position;
    birth_date?: Date;
    starter: boolean;
};
