function TodoForm({ onChangeHandler, disabled, handleAddTodo, item}) {
    return (
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={item.name}
            onChange={(e) => onChangeHandler(e)}
          />
          <button
            className="btn btn-primary"
            disabled={disabled}
            onClick={handleAddTodo}
          >
            {!item.id ? "Add" : "Update"}
          </button>
        </div>
      </form>
    );
  }
  
  export default TodoForm;
  