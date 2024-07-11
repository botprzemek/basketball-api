import { Request, Response } from "express";
import * as controller from "@/controllers/players";

export namespace Handler {
    export function get(_: Request, response: Response): void {
        const payload: Player[] = controller.get();

        response.setHeader("Content-Type", "application/json");
        response.send(payload);
    }

    export function create(_: Request, response: Response): void {
        const payload: Player[] = controller.create();

        response.setHeader("Content-Type", "application/json");
        response.send(payload);
    }

    export function update(_: Request, response: Response): void {
        const payload: Player[] = controller.update();

        response.setHeader("Content-Type", "application/json");
        response.send(payload);
    }

    export function remove(_: Request, response: Response): void {
        const payload: Player[] = controller.remove();

        response.setHeader("Content-Type", "application/json");
        response.send(payload);
    }

    // TODO
    // Player by param handler
    // export function getPlayerBy(_: Request, response: Response): void {
    //     const payload: Player[] = get();
    //
    //     response.setHeader("Content-Type", "application/json");
    //     response.send(payload);
    // }
}
