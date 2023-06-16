import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./api/todos";
import { formatMonth } from "./mixins/dateUtils";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [item, setItem] = useState({ id: 0, name: "", date: "", time: "" });
  const [disabled, setDisabled] = useState(true);
  const { data: todos = [], refetch: refetchTodos } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!item.id) {
      await createTodo({ ...item });
    } else {
      await updateTodo({ ...item });
    }
    refetchTodos();
    setItem({ name: "", date: "", time: "" });
    setDisabled(true)
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    refetchTodos();
  };

  const handleEditTodo = (item) => {
    setItem({ id: item.id, name: item.name, date: item.date, time: item.time });
  };

  const onChangeHandler = (e) => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${formatMonth(
      currentDate.getMonth()
    )}/${currentDate.getFullYear()}`;
    const time = currentDate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const updatedItem = {
      ...item,
      name: e.target.value,
      date,
      time,
    };
    setItem(updatedItem);
    setDisabled(!e.target.value);
  };

  return (
    <div className="container">
      <h1>TODO List</h1>

      <TodoForm
        handleAddTodo={handleAddTodo}
        onChangeHandler={onChangeHandler}
        item={item}
        disabled={disabled}
      />

      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
      />
    </div>
  );
}

export default App;
