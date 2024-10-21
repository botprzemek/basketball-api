declare namespace Express {
    export interface Request {
        user?: import("@/types/model/user").User;
    }
}
