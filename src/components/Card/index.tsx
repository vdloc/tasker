import { PropsWithChildren } from "react";
import CardHeader from "./Header";
import type { CardHeaderProp } from "./Header";
import CardFooter from "./Footer";
import SlidePopUp from "../SlidePopup";
import TodoList from "../TodoList";

type CardProps = PropsWithChildren & CardHeaderProp;

export default function Card({ title, description }: CardProps) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-2xl w-[30rem] relative z-20">
      <CardHeader title={title} description={description} />
      <TodoList />
      <CardFooter />
      <SlidePopUp />
    </div>
  );
}
