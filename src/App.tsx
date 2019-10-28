import React, { Fragment, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type FormElem = React.FormEvent<HTMLFormElement>;

interface IToDo {
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setToDos] = useState<IToDo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addToDo(value);
    setValue("");
  };

  const addToDo = (text: string): void => {
    const newToDos: IToDo[] = [...todos, { text, complete: false }];
    setToDos(newToDos);
  };

  const completeToDos = (index: number): void => {
    const newToDos: IToDo[] = [...todos];
    newToDos[index].complete = !newToDos[index].complete;
    setToDos(newToDos);
  };

  const removeToDos = (index: number): void => {
    const newToDos: IToDo[] = [...todos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
  };

  return (
    <Fragment>
      <h1>To do list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add todo </button>
      </form>
      <section>
        {todos.map((todo: IToDo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {" "}
              {todo.text}{" "}
            </div>
            <button type="button" onClick={() => completeToDos(index)}>
              {" "}
              {todo.complete ? "incomplete" : "complete"}{" "}
            </button>
            <button type="button" onClick={() => removeToDos(index)}>
              &times;
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
};

export default App;
