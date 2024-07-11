import data from "@/services/dataSources";

export namespace Controller {
    export const get = (): Player[] => data().players.get();

    export const create = (): void => data().players.create();

    export const update = (): void => data().players.update();

    export const remove = (): void => data().players.remove();
}
