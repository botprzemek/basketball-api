const formatDate = (): string =>
    `[${new Date().toLocaleString("pl-PL").replace(", ", "-")}]`;

export const info = (address: string, values: Array<string | number>): void =>
    console.log(address, formatDate(), ...values);

export const error = (address: string, values: Array<string | number>): void =>
    console.error(address, formatDate(), `ERROR`, ...values);

export default {
    info,
    error,
};
