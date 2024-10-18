import database from "@/services/data/database";
import cache from "@/services/data/cache";
import { failure, success } from "@/utils/error";

export const find = async (id?: string): Promise<Data> => {
    if (!id) {
        const cached = await cache.get("players");

        if (cached && cached.length > 0) {
            return success(cached);
        }

        const players: Player[] = await database.get()<
            Player[]
        >`SELECT * FROM players_identities`;

        // TODO

        void cache.set("players", players);

        return success(players);
    }

    const cached = await cache.getOne(`players/${id}`);

    if (cached) {
        return success([cached]);
    }

    const [player]: [Player?] = await database.get()`SELECT *
                                                     FROM players
                                                 WHERE players.id = ${id}`;

    if (!player) {
        return failure({
            code: 404,
            message: "",
            status: 404,
            title: "Player not found",
        });
    }

    void cache.set(`players/${id}`, player);

    return success([player]);
};

export const create = async (players: Player[]): Promise<Data> => {
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

export default { find, create, update, remove };
