"use client";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { todoSchema } from "@/database/schema/todos";
import { createTodo } from "./actions";
import { useTransition } from "react";

export default function TodoForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      task: "",
      done: false,
    },
  });

  const onSubmit = (values: z.infer<typeof todoSchema>) => {
    startTransition(() => {
      createTodo(values)
        .then((response) => {
          form.reset();
          toast(response.message, {
            position: "top-center",
            action: {
              label: "X",
              onClick: () => console.log("Undo"),
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary-foreground">
                  Task
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="What would you do?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
