import Todo from "@components/Todo";
import TodoListHeader from "./Header";
import { type TodoItem } from "@/types";
import { useEffect } from "react";

type TodoListProps = {
  todos: TodoItem[];
};

export default function TodoList({ todos = [] }: TodoListProps) {
  useEffect(() => {
    console.log("Todolist", todos);
  }, [todos]);

  return (
    <fieldset>
      <TodoListHeader />
      {todos.length ? (
        <div className="divide-y divide-gray-200 border-t border-gray-200 text-left px-4 max-h-[35rem] overflow-y-scroll">
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </div>
      ) : (
        <p className="">Waiting for something to do ?</p>
      )}
    </fieldset>
  );
}
