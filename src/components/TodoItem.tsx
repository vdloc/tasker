type TodoItem = {
  title: string;
  description: string;
  status: boolean;
  tags?: string[];
  createTime?: Date;
  dueTime?: Date;
  finishTime?: Date;
};
export default function TodoItem({
  title,
  description,
  status,
  tags,
  createTime,
  dueTime,
  finishTime,
}: TodoItem) {
  return;
}
