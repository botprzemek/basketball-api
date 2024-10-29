export const id = (id: string | undefined): id is UUID =>
    !!id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);

export const data = (data: Model): data is Model => !!data; //&& Object.keys(data).length >= 1;

export default {
    id,
    data,
};
