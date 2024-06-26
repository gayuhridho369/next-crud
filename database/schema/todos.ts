import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";
import { z } from "zod";

export const todoSchema = z.object({
  task: z.string().min(1),
  done: z.boolean(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: text("task"),
  done: boolean("done"),
});

export type Todo = InferSelectModel<typeof todos>;
