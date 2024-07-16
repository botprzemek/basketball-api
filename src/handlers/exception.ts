const EXCEPTIONS: string[] = ["uncaughtException", "unhandledRejection"];

const register = (event: string): void => {
    process.on(event, (error: Error): void => {
        console.error(
            `An error occurred on "${event}": ${error.stack || error}`,
        );
    });
};

export default (): void => {
    EXCEPTIONS.forEach(register);
};
