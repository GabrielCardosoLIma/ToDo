import { useState } from "react";

import { PlusCircle } from "phosphor-react";
import Clipboard from "./assets/Clipboard.png";

import LogoToDo from "./assets/Logo-toDo.svg";

import { CardTask, Tasks } from "./components/CardTask";

import styles from "./App.module.css";
import "./global.css";

export function App() {
  const [tasks, SetTasks] = useState<Tasks[]>([]);
  const [taskText, setTaskText] = useState("");

  const countTasksCompleted = tasks.reduce((count, task) => {
    if (task.isConcluded) {
      count += 1;
    }

    return count;
  }, 0);

  function handleNewTask() {
    SetTasks((tasks) => [
      { id: Math.random(), content: taskText, isConcluded: false },
      ...tasks,
    ]);
  }

  function handleTaskCompleted(taskId: number) {
    SetTasks((prevTasks: Tasks[]) => {
      return prevTasks.map((task) =>
        task.id !== taskId ? task : { ...task, isConcluded: !task.isConcluded }
      );
    });
  }

  function handleDeleteTask(taskId: number) {
    const tasksUpdate = tasks.filter((task) => {
      return task.id !== taskId;
    });

    SetTasks(tasksUpdate);
  }

  return (
    <div>
      <header className={styles.header}>
        <img src={LogoToDo} alt="Logo ToDo" />
      </header>
      <main className={styles.main}>
        <div className={styles.containerInput}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setTaskText(e.target.value)}
            value={taskText}
          />
          <button onClick={handleNewTask} disabled={taskText.length == 0}>
            Criar <PlusCircle size={20} />
          </button>
        </div>
        <div className={styles.accountants}>
          <div className={styles.createdTasks}>
            Tarefas criadas{" "}
            <span className={styles.countTasks}>{tasks.length}</span>
          </div>
          <div className={styles.completedTasks}>
            Concluídas{" "}
            <span className={styles.countTasks}>
              {tasks.length > 0
                ? `${countTasksCompleted} de ${tasks.length}`
                : "0"}
            </span>
          </div>
        </div>
        <div className={styles.containerList}>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <CardTask
                  key={task.id}
                  task={task}
                  handleTaskCompleted={handleTaskCompleted}
                  handleDeleteTask={handleDeleteTask}
                />
              );
            })
          ) : (
            <div className={styles.emptyContainer}>
              <img src={Clipboard} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
