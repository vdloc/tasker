import { PropsWithChildren, useEffect } from "react";
import CardHeader from "./Header";
import type { CardHeaderProp } from "./Header";
import CardFooter from "./Footer";
import DialogPopup from "../DialogPopup";
import TodoList from "../TodoList";
import TaskEditForm from "../TaskEditForm";
import { useStore } from "@/store";

type CardProps = PropsWithChildren & CardHeaderProp;

export default function Card({ title, description }: CardProps) {
  const isTaskUpdateDialogOpen = useStore(
    (state) => state.isTaskUpdateDialogOpen
  );
  const toggleTaskUpdateDialog = useStore(
    (state) => state.toggleTaskUpdateDialog
  );
  const setSelectingTask = useStore((state) => state.setSelectingTask);
  const fetchTasks = useStore((state) => state.fetchTasks);
  const tasks = useStore((state) => state.tasks);

  function handleCloseTaskEditDialog() {
    toggleTaskUpdateDialog(false);
    setSelectingTask(null);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-2xl w-[30rem] relative z-10">
      <CardHeader title={title} description={description} />
      <TodoList todos={tasks} />
      <CardFooter />
      <DialogPopup
        isOpen={isTaskUpdateDialogOpen}
        onClose={handleCloseTaskEditDialog}
      >
        <TaskEditForm />
      </DialogPopup>
    </div>
  );
}
