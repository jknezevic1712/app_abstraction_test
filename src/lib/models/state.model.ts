export type StoreProvider = "davstack" | "tanstack";

export interface Character {
	name: string;
	hp: number;
	level: number;
	power: number;
}

export interface GameState {
	roundLength: number;
	roundsWon: number;
}

export interface GameData {
	player: Character | null;
	opponent: Character | null;
	gameState: GameState;
}

export interface StateModel {
	gameData: GameData;
}
