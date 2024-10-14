import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const HOST: string = "127.0.0.1";
const PORT: number = 3000;
const SECRET: string = "your-secret-token"

const identities: any[] = [];
const players: any[] = [];
const users: any[] = [];
const tenancies: any[] = [];
const permissions: any[] = [];

const user = { id: 1, username: "admin", password: "admin123", tenantId: "tenant1" };
const token = jwt.sign(user, "your_jwt_secret");

users.push(user);
tenancies.push({ id: "tenant1", name: "Tenant One" });
permissions.push({ userId: 1, tenantId: "tenant1", read: true, write: true, update: true, delete: true });

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

	const token: string | undefined = authHeader.split(" ")[1];

	if (!token) {
		return res.status(403).json({ message: "Invalid token" });
	}

	jwt.verify(token, SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}

		req.user = user;
		next();
	});
};

const checkPermission = (action: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const userPermissions = permissions.find(p => p.userId === req.user.id && p.tenantId === req.tenantId);
		if (!userPermissions || !userPermissions[action]) {
			return res.status(403).json({ message: "Insufficient permissions" });
		}
		next();
	};
};

const mergePlayerWithIdentity = (player) => {
	const identity = identities.find(i => i.id === player.identity_id);

	if (!identity) return player;

	const sanitizedIdentity = !req.user
		? identity
		: { id: identity.id, first_name: identity.first_name, last_name: identity.last_name };

	const { identity_id, ...playerDataWithoutIdentityId } = player;
	return { ...playerDataWithoutIdentityId, identity: sanitizedIdentity };
};

const getController = (req, res) => {
	const tenantPlayers = players.filter(p => p.user_id = req.user.id);
	const response = tenantPlayers.map(player => mergePlayerWithIdentity(player));
	res.json({ data: response });
}

const getByIdController = (req, res) => {
	const playerId = parseInt(req.params.id, 10);
	const playerIndex = players.findIndex(p => p.id === playerId && req.user.tenantId === req.tenantId);

	if (players[playerIndex]) {
		const response = mergePlayerWithIdentity(players[playerIndex]);
		res.json({ data: [response] });
	} else {
		res.status(404).json({ message: "Player not found" });
	}
}

const postController = (req, res) => {
	const newPlayerData = req.body.data[0];

	const { user_id, number, height, weight, wingspan, main_hand, position, nickname, identity } = newPlayerData;

	console.log(req.user.id, user_id);

	if (req.user.id === user_id) {
		return res.status(400).json({ message: "Invalid user" });
	}

	if (!identity || !identity.first_name || !identity.last_name || !identity.email || !user_id || !number) {
		return res.status(400).json({ message: "Required fields are missing" });
	}

	const newIdentityId = identities.length ? identities[identities.length - 1].id + 1 : 101;
	const newIdentity = {
		id: newIdentityId,
		first_name: identity.first_name,
		last_name: identity.last_name,
		email: identity.email,
		phone: identity.phone,
		birth_date: identity.birth_date,
		pesel_number: identity.pesel_number
	};
	identities.push(newIdentity);

	const newPlayerId = players.length ? players[players.length - 1].id + 1 : 1;
	const newPlayer = {
		id: newPlayerId,
		identity_id: newIdentityId,
		user_id,
		number,
		height,
		weight,
		wingspan,
		main_hand,
		position,
		nickname,
		identity: newIdentity
	};
	players.push(newPlayer);

	res.status(201).json({ data: [newPlayer] });
}

const updateController = (req, res) => {
	const playerId = parseInt(req.params.id, 10);
	const playerIndex = players.findIndex(p => p.id === playerId && req.user.tenantId === req.tenantId);

	if (playerIndex !== -1) {
		const updatedPlayer = { ...players[playerIndex], ...req.body.data[0], id: playerId };
		players[playerIndex] = updatedPlayer;
		res.json({ data: [updatedPlayer] });
	} else {
		res.status(404).json({ message: "Player not found" });
	}
};

const deleteController = (req, res) => {
	const playerId = parseInt(req.params.id, 10);
	const playerIndex = players.findIndex(p => p.id === playerId);

	if (playerIndex !== -1) {
		players = players.filter(player => player.id !== playerId);
		res.status(204).end();
	} else {
		res.status(404).json({ message: "Player not found" });
	}
});

express()
	.use(express.json())
	.get("/v1/players", authMiddleware, checkPermission("read"), getController)
	.get("/v1/players/:id", authMiddleware, checkPermission("read"), getByIdController)
	.post("/v1/players", authMiddleware, checkPermission("write"), postController)
	.put("/v1/players/:id", authMiddleware, checkPermission("update"), updateController)
	.delete("/v1/players/:id", authMiddleware, checkPermission("delete"), deleteController)
	.listen(PORT, HOST, (): void => {
		console.log(`Server is running on http://localhost:${PORT}/v1/players`);
		console.log("Sample JWT Token:", token);
	});