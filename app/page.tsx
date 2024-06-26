import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTodo } from "./actions";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import { Toaster } from "@/components/ui/sonner";

export default async function Page() {
  const todos = await getTodo();

  return (
    <>
      <div className="min-h-screen w-screen flex justify-center mt-10">
        <Card className="w-[500px] h-max">
          <CardHeader>
            <h1 className="text-lg font-bold">Todo List</h1>
          </CardHeader>
          <CardContent>
            <TodoForm />
            <TodoList todos={todos} />
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
}
