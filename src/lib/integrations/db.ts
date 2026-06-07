// import { drizzle } from "drizzle-orm/node-postgres";
// import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// const tableSchema = {
// 	todos: pgTable("todos", {
// 		id: serial().primaryKey(),
// 		title: text().notNull(),
// 		createdAt: timestamp("created_at").defaultNow(),
// 	}),
// };

// export const db = drizzle(process.env.DATABASE_URL!, { schema: tableSchema });

// export function useDbTables() {
// 	return {
// 		...tableSchema,
// 	};
// }
