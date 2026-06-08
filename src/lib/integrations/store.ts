import { store as createDavstackStore } from "@davstack/store";
import { useSelector as useTanStackStore } from "@tanstack/react-store";
import { createStore as createTanstackStore } from "@tanstack/store";
import type { Character, StateModel, StoreProvider } from "../models";

const initialState: StateModel = {
	gameData: {
		player: null,
		opponent: null,
		gameState: {
			roundLength: 0,
			roundsWon: 0,
		},
	},
};

const davstackStore = createDavstackStore()
	.state(initialState)
	.actions((state) => ({
		getPlayerData: () => state.gameData.player.use(),
		getOpponentData: () => state.gameData.opponent.use(),
		getRoundLength: () => state.gameData.gameState.roundLength.use(),
		getRoundsWon: () => state.gameData.gameState.roundsWon.use(),

		setPlayerData: (data: Character) => state.gameData.player.set(data),
		setOpponentData: (data: Character) => state.gameData.opponent.set(data),
		setRoundLength: (time: number) =>
			state.gameData.gameState.roundLength.set(time),
		setRoundsWon: (num: number) => state.gameData.gameState.roundsWon.set(num),
	}));

export const tanstackStore = createTanstackStore(
	initialState,
	({ setState, get }) => ({
		getPlayerData: () => get().gameData.player,
		getOpponentData: () => get().gameData.opponent,
		getRoundLength: () => get().gameData.gameState.roundLength,
		getRoundsWon: () => get().gameData.gameState.roundsWon,

		setPlayerData: (data: Character) =>
			setState((prev) => ({
				...prev,
				gameData: {
					...prev.gameData,
					player: data,
				},
			})),
		setOpponentData: (data: Character) =>
			setState((prev) => ({
				...prev,
				gameData: {
					...prev.gameData,
					opponent: data,
				},
			})),
		setRoundLength: (time: number) =>
			setState((prev) => ({
				...prev,
				gameData: {
					...prev.gameData,
					gameState: {
						...prev.gameData.gameState,
						roundLength: time,
					},
				},
			})),
		setRoundsWon: (num: number) =>
			setState((prev) => ({
				...prev,
				gameData: {
					...prev.gameData,
					gameState: {
						...prev.gameData.gameState,
						roundLength: num,
					},
				},
			})),
	}),
);

export function useDavstackStore() {
	return {
		playerData: davstackStore.getPlayerData(),
		opponentData: davstackStore.getOpponentData(),
		roundLength: davstackStore.getRoundLength(),
		roundsWon: davstackStore.getRoundsWon(),

		setPlayerData: davstackStore.setPlayerData,
		setOpponentData: davstackStore.setOpponentData,
		setRoundLength: davstackStore.setRoundLength,
		setRoundsWon: davstackStore.setRoundsWon,
	};
}

export function useTanstackStore() {
	const playerData = useTanStackStore(
		tanstackStore,
		(state) => state.gameData.player,
	);

	const opponentData = useTanStackStore(
		tanstackStore,
		(state) => state.gameData.opponent,
	);

	const roundLength = useTanStackStore(
		tanstackStore,
		(state) => state.gameData.gameState.roundLength,
	);

	const roundsWon = useTanStackStore(
		tanstackStore,
		(state) => state.gameData.gameState.roundsWon,
	);

	return {
		playerData,
		opponentData,
		roundLength,
		roundsWon,

		setPlayerData: tanstackStore.actions.setPlayerData,
		setOpponentData: tanstackStore.actions.setOpponentData,
		setRoundLength: tanstackStore.actions.setRoundLength,
		setRoundsWon: tanstackStore.actions.setRoundsWon,
	};
}

export function useStore(storeProvider: StoreProvider) {
	const davstack = useDavstackStore();
	const tanstack = useTanstackStore();

	return storeProvider === "davstack" ? davstack : tanstack;
}
