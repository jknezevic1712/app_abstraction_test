import { store } from "@davstack/store";
import { useCallback } from "react";
import type { Character, StateModel } from "../models";

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

const appStore = store()
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

export function useStore() {
	// ! GETTERS
	const getPlayerData = useCallback(() => {
		return appStore.getPlayerData();
	}, []);
	const getOpponentData = useCallback(() => {
		return appStore.getOpponentData();
	}, []);
	const getRoundLength = useCallback(() => {
		return appStore.getRoundLength();
	}, []);
	const getRoundsWon = useCallback(() => {
		return appStore.getRoundsWon();
	}, []);

	// ! SETTERS
	const setPlayerData = useCallback((data: Character) => {
		return appStore.setPlayerData(data);
	}, []);
	const setOpponentData = useCallback((data: Character) => {
		return appStore.setOpponentData(data);
	}, []);
	const setRoundLength = useCallback((length: number) => {
		return appStore.setRoundLength(length);
	}, []);
	const setRoundsWon = useCallback((num: number) => {
		return appStore.setRoundsWon(num);
	}, []);

	return {
		getPlayerData,
		getOpponentData,
		getRoundLength,
		getRoundsWon,

		setPlayerData,
		setOpponentData,
		setRoundLength,
		setRoundsWon,
	};
}
