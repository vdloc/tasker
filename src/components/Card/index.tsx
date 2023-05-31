import { PropsWithChildren } from "react";
import CardHeader from "./Header";
import type { CardHeaderProp } from "./Header";
import CardFooter from "./Footer";
import DialogPopup from "../DialogPopup";
import TodoList from "../TodoList";
import TaskEditForm from "../TaskEditForm";
import { useStore } from "@/store";

type CardProps = PropsWithChildren & CardHeaderProp;

export default function Card({ title, description }: CardProps) {
  const isTaskUpdatePopupOpen = useStore(
    (state) => state.isTaskUpdatePopupOpen
  );
  const toggleTaskUpdatePopup = useStore(
    (state) => state.toggleTaskUpdatePopup
  );
  const setSelectingTask = useStore((state) => state.setSelectingTask);

  function handleCloseTaskEditDialog() {
    toggleTaskUpdatePopup(false);
    setSelectingTask(null);
  }

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-2xl w-[30rem] relative z-10">
      <CardHeader title={title} description={description} />
      <TodoList />
      <CardFooter />
      <DialogPopup
        isOpen={isTaskUpdatePopupOpen}
        onClose={handleCloseTaskEditDialog}
      >
        <TaskEditForm />
      </DialogPopup>
    </div>
  );
}
