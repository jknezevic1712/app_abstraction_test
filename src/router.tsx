import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getApiContextProviderData } from "./lib/integrations";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const { contextClient } = getApiContextProviderData();

	const router = createTanStackRouter({
		routeTree,
		context: { queryClient: contextClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	});

	setupRouterSsrQueryIntegration({ router, queryClient: contextClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
