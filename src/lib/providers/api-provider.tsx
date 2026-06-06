import type { ReactNode } from "react";
import { useApiContextProviderData } from "../integrations";

export function ApiContextProvider({ children }: { children: ReactNode }) {
	const { ContextProvider, contextClient } = useApiContextProviderData();

	return <ContextProvider client={contextClient}>{children}</ContextProvider>;
}
