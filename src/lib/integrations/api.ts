import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function useApiContextProviderData() {
	const queryClient = new QueryClient();

	return {
		contextClient: queryClient,
		ContextProvider: QueryClientProvider,
	};
}
