import type { ReactNode } from "react";
import { getApiContextProviderData } from "../integrations";

export function ApiContextProvider({ children }: { children: ReactNode }) {
	const { ContextProvider, contextClient } = getApiContextProviderData();

	return <ContextProvider client={contextClient}>{children}</ContextProvider>;
}
