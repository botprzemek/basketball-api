import { send, wrap } from "@/server/data";

export default (_request: Request, response: Response): void => {
    send(
        wrap({
            status: 404,
            message: "Resource not found",
        }),
        response,
    );
}
