import { TaskType } from "./types/TaskType";

export const reorder = (
  list: TaskType[],
  startIndex: number,
  endIndex: number
) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
