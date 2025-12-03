import { useState } from "react";
import "./App.css";

function App() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "Design UI/UX" },
        { id: "2", content: "Write Projects" },
      ],
    },
    Progress: {
      name: "Priority",
      items: [{ id: "3", content: "Developing" }],
    },
    Done: {
      name: "Done",
      items: [{ id: "4", content: "Testing" }],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumns, setActiveColumns] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = () => {
    if (newTask.trim() === "") return;

    const updatedColumns = { ...columns };

    updatedColumns[activeColumns].items.push({
      id: Date.now().toString(),

      content: newTask,
    });

    setColumns(updatedColumns);
    setNewTask("");
  };

  const removeTask = (columnId, taskId) => {
    const updatedColumns = { ...columns };

    updatedColumns[columnId].items = updatedColumns[columnId].items.filter(
      (item) => item.id !== taskId
    );

    setColumns(updatedColumns);
  };

  const handleDragStart = (columnId, item) => {
    setDraggedItem({ columnId, item });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnId) => {
    if (!draggedItem) return;

    const { columnId: sourceColumnId, item } = draggedItem;

    if (sourceColumnId === columnId) return;

    const updatedColumns = { ...columns };

    updatedColumns[sourceColumnId].items = updatedColumns[
      sourceColumnId
    ].items.filter((i) => i.id !== item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);
  };

  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-blue-500 to-blue-700",
      border: "border-blue-500",
    },
    Progress: {
      header: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      border: "border-yellow-500",
    },
    Done: {
      header: "bg-gradient-to-r from-green-500 to-green-700",
      border: "border-green-500",
    },
  };

  return (
    <>
      <div className="origin-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-linear-to-t from-blue-300 to-red-300">
            Vorti Group (Task Manager)
          </h1>

          <div
            className="mb-8 flex w-full max-w-lg shadow-lg
           rounded-lg overflow-hidden"
          >
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicione uma nova tarefa..."
              className="grow p-3 bg-zinc-700 text-white"
              onKeyDown={(e) => e.key === "Enter" && addNewTask()}
            />

            <select
              value={activeColumns}
              onChange={(e) => setActiveColumns(e.target.value)}
              className="p-3 bg-zinc-700 text-white border-0 border-l border-zinc-600"
            >
              {Object.keys(columns).map((columnId) => (
                <option value={columnId} key={columnId}>
                  {columns[columnId].name}
                </option>
              ))}
            </select>

            <button
              onClick={addNewTask}
              className="px-6 bg-linear-to-r from-blue-500 to-blue-700 text-white
             font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-300 cursor-pointer"
            >
              Add
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 w-full justify-center">
            {Object.keys(columns).map((columnId) => (
              <div
                key={columnId}
                className={`shrink-0 w-80 bg-zinc-800 rounded lg
                shadow-xl overflow-hidden ${
                  columnStyles[columnId]?.border || "border-gray-500"
                }`}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={() => handleDrop(columnId)}
              >
                <div
                  className={`p-4 text-white font-bold text-xl rounded-t-md 
                   ${columnStyles[columnId]?.header || "bg-gray-700"}`}
                >
                  {columns[columnId].name}
                  <span className="ml-2 px-2 py-1 bg-zinc-800 bg-opacity-30 rounded-full text-sm">
                    {columns[columnId].items.length}
                  </span>
                </div>

                <div className="p-3 min-h-64">
                  {columns[columnId].items.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500 italic text-sm">
                      Jogue as tarefas aqui...
                    </div>
                  ) : (
                    columns[columnId].items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 mb-3 bg-zinc-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        draggable
                        onDragStart={() => handleDragStart(columnId, item)}
                      >
                        <span className="mr-2">{item.content}</span>

                        <button
                          onClick={() => removeTask(columnId, item.id)}
                          className="text-zinc-400 hover:text-red-400 transition-colors duration-200 w-6 h-6 flex items-center justify-center rounded-full hover:bg-zinc-600"
                        >
                          <span className="text-lg cursor-pointer">x</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
