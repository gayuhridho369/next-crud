"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/database/schema/todos";
import { DeleteIcon, TrashIcon } from "lucide-react";
import { deleteTodo } from "./actions";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={todo?.done || false} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-3"
            >
              {todo.task}{" "}
              <div onClick={() => deleteTodo(todo.id)}>
                <TrashIcon className="w-4 h-4 cursor-pointer" />
              </div>
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}
