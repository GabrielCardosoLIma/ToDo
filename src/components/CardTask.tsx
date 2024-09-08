import { Trash, Check } from "phosphor-react";

import styles from "./CardTask.module.css";

export interface Tasks {
  id: number;
  content: string;
  isConcluded: boolean;
}

interface CardTaskProps {
  task: Tasks;
  handleTaskCompleted: (taskId: number) => void;
  handleDeleteTask: (taskId: number) => void;
}

export function CardTask({
  task,
  handleTaskCompleted,
  handleDeleteTask,
}: CardTaskProps) {
  return (
    <div key={task.id} className={styles.containerTasks}>
      <div className={styles.alignToggleContent}>
        <button
          className={
            task.isConcluded
              ? styles.toggleTaskActive
              : styles.toggleTaskInactive
          }
          onClick={() => handleTaskCompleted(task.id)}
        >
          {task.isConcluded && <Check color="white" size={17} />}
        </button>
        <span
          className={
            task.isConcluded
              ? styles.toggleTaskActiveText
              : styles.toggleTaskInactiveText
          }
        >
          {task.content}
        </span>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => handleDeleteTask(task.id)}
      >
        <Trash className={styles.trashIcon} size={24} />
      </button>
    </div>
  );
}
