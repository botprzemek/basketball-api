const formatDate = (): string => `[${new Date().toLocaleString("pl-PL").replace(", ", "-")}]`;

export const logInfo = (address: string, values: Array<string | number>): void =>
    console.log(address, formatDate(), ...values);

export const logError = (address: string, values: Array<string | number>): void =>
    console.error(address, formatDate(), `ERROR`, ...values);
