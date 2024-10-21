import database from "@/services/data/database";
import cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";

export const find = async (user: User): Promise<Data> => {
    const cached = await cache.get(`${user.id}/players`);

    if (cached && cached.length > 0) {
        return success(cached);
    }

    const players: Player[] = await database.get()<Player[]>`
        SELECT *
        FROM
            players_identities,
            users
        WHERE
            players_identities.user_id = users.id
        AND
            users.id = ${user.id}`;
    // TODO

    void cache.set(`${user.id}/players`, players);

    return success(players);
};

export const findById = async (user: User, id?: UUID): Promise<Data> => {
    const cached = await cache.getOne(`${user.id}/players/${id}`);

    if (cached) {
        return success([cached]);
    }

    const [player]: [Player?] = await database.get()`SELECT *
                                                 FROM
                                                     players_identities
                                                 WHERE
                                                     players_identities.id = ${id}`;

    if (!player) {
        return failure({
            code: 404,
            message: "",
            status: 404,
            title: "Player not found",
        });
    }

    void cache.set(`${user.id}/players/${id}`, player);

    return success([player]);
};

export const create = async (players: Model[]): Promise<Data> => {
    const result = await database.get()<
        Player[]
    >`INSERT INTO players ${database.get()(players)} RETURNING *`;

    void cache.clear(["players"]);

    if (!result) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to create Player",
        });
    }

    const refreshed: Player[] = await database.get()<Player[]>`SELECT *
                                 FROM players`;

    void cache.set("players", refreshed);

    return success(refreshed);
};

export const update = async (id: string, player: Player): Promise<Data> => {
    const [updated]: [Player?] = await database.get()`
        UPDATE players SET ${database.get()(player)} WHERE players.id = ${id} RETURNING *`;

    if (!updated) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to update Player",
        });
    }

    void cache.set(`players/${id}`, updated);

    const players: Player[] = await database.get()<Player[]>`SELECT *
                                 FROM players`;

    void cache.set("players", players);

    return success(players);
};

export const remove = async (id: string): Promise<Data> => {
    const [result] = await database.get()`DELETE
                                                FROM players
                                          WHERE players.id = ${id} RETURNING *`;

    if (!result) {
        return failure({
            code: 500,
            message: "",
            status: 500,
            title: "Failed to remove Player",
        });
    }

    void cache.clear(["players", `players/${id}`]);

    return success({
        code: 200,
        message: "",
        status: 200,
        title: "Successfully removed Player",
    });
};

export default { find, findById, create, update, remove };
