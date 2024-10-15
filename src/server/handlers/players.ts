import player from "@/services/data/models/player";
import validate from "@/utils/validate";
import send from "@/utils/send";
import { failure } from "@/utils/error";

import { Request, Response } from "express";

export const get = async (
    _request: Request,
    response: Response,
): Promise<void> => {
    send(await player.find(), response);
};

export const getById = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "Player ID is not valid",
        });

        send(error, response);

        return;
    }

    send(await player.find(id), response);
};

// const postController = (req, res) => {
//     const newPlayerData = req.body.data[0];
//
//     const { user_id, number, height, weight, wingspan, main_hand, position, nickname, identity } = newPlayerData;
//
//     console.log(req.user.id, user_id);
//
//     if (req.user.id === user_id) {
//         return res.status(400).json({ message: "Invalid user" });
//     }
//
//     if (!identity || !identity.first_name || !identity.last_name || !identity.email || !user_id || !number) {
//         return res.status(400).json({ message: "Required fields are missing" });
//     }
//
//     const newIdentityId = identities.length ? identities[identities.length - 1].id + 1 : 101;
//     const newIdentity = {
//         id: newIdentityId,
//         first_name: identity.first_name,
//         last_name: identity.last_name,
//         email: identity.email,
//         phone: identity.phone,
//         birth_date: identity.birth_date,
//         pesel_number: identity.pesel_number
//     };
//     identities.push(newIdentity);
//
//     const newPlayerId = players.length ? players[players.length - 1].id + 1 : 1;
//     const newPlayer = {
//         id: newPlayerId,
//         identity_id: newIdentityId,
//         user_id,
//         number,
//         height,
//         weight,
//         wingspan,
//         main_hand,
//         position,
//         nickname,
//         identity: newIdentity
//     };
//     players.push(newPlayer);
//
//     res.status(201).json({ data: [newPlayer] });
// }

export const post = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { data } = request.body;

    if (!validate.data(data)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "User Data is not valid",
        });

        send(error, response);

        return;
    }

    send(await player.create(data), response);
};

// const updateController = (req, res) => {
//     const playerId = parseInt(req.params.id, 10);
//     const playerIndex = players.findIndex(p => p.id === playerId && req.user.tenantId === req.tenantId);
//
//     if (playerIndex !== -1) {
//         const updatedPlayer = { ...players[playerIndex], ...req.body.data[0], id: playerId };
//         players[playerIndex] = updatedPlayer;
//         res.json({ data: [updatedPlayer] });
//     } else {
//         res.status(404).json({ message: "Player not found" });
//     }
// };

export const put = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "Player ID is not valid",
        });

        send(error, response);

        return;
    }

    const { data } = request.body;

    if (!validate.data(data)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "Player Data is not valid",
        });

        send(error, response);

        return;
    }

    send(await player.update(id, data.at(0) as Player), response);
};

// const deleteController = (req, res) => {
//     const playerId = parseInt(req.params.id, 10);
//     const playerIndex = players.findIndex(p => p.id === playerId);
//
//     if (playerIndex !== -1) {
//         players = players.filter(player => player.id !== playerId);
//         res.status(204).end();
//     } else {
//         res.status(404).json({ message: "Player not found" });
//     }
// });

export const _delete = async (
    request: Request,
    response: Response,
): Promise<void> => {
    const { id } = request.params;

    if (!validate.id(id)) {
        const error: Data = failure({
            code: 400,
            message: "",
            status: 400,
            title: "Player ID is not valid",
        });

        send(error, response);

        return;
    }

    send(await player.remove(id), response);
};
