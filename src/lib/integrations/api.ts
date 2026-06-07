import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function getApiContextProviderData() {
	const queryClient = new QueryClient();

	return {
		contextClient: queryClient,
		ContextProvider: QueryClientProvider,
	};
}
