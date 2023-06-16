import React from "react";

function TodoList({ todos, onDeleteTodo, onEditTodo }) {
  const handleDeleteTodo = async (id) => {
    await onDeleteTodo(id);
  };

  const handleEditTodo = (item) => {
    onEditTodo(item);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th className="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        { todos.length > 0 ?
        (todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>{todo.date}</td>
            <td>{todo.time}</td>
            <td className="d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                delete
              </button>
              <button
                className="btn btn-secondary ms-3"
                onClick={() => handleEditTodo(todo)}
              >
                edit
              </button>
            </td>
          </tr>
        ))):
        (<tr><td className="text-center" colSpan={5}>No added item.</td></tr>)}
      </tbody>
    </table>
  );
}

export default TodoList;
