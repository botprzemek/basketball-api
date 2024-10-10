export const id = (id: string | undefined): id is string =>
    !!id && /^\d{16,20}$/.test(id);

export const data = (data: Model[]): data is Model[] =>
    !!data && data.length >= 1;

export default {
    id,
    data,
};
