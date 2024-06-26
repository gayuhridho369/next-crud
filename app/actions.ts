"use server";

import db from "@/database/drizzle";
import { todoSchema, todos } from "@/database/schema/todos";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getTodo = async () => {
  const result = await db.select().from(todos);

  return result;
};

export const createTodo = async (todo: z.infer<typeof todoSchema>) => {
  const { task, done } = todo;

  try {
    await db.insert(todos).values({ task, done });
    revalidatePath("/");

    return {
      status: 200,
      message: "Todo has been created successfully.",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Todo failed to create, something went wrong",
    };
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await db.delete(todos).where(eq(todos.id, id));
    revalidatePath("/");

    return {
      status: 200,
      message: "Todo has been deleted successfully.",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Todo failed to delete, something went wrong",
    };
  }
};
