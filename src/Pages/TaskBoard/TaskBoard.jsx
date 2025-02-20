import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Custom sortable item component for each task
const SortableItem = ({ id, task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded mb-2 shadow border border-gray-200"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      {task.description && (
        <p className="text-gray-600 text-sm">{task.description}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">
        {new Date(task.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

// Initial columns with three categories
const initialColumns = {
  todo: { title: 'To‑Do', items: [] },
  inprogress: { title: 'In Progress', items: [] },
  done: { title: 'Done', items: [] },
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [activeId, setActiveId] = useState(null);

  // Set up sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim() === '' || taskTitle.length > 50 || taskDesc.length > 200) return;
    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      description: taskDesc,
      timestamp: new Date().toISOString(),
      category: selectedColumn,
    };

    setColumns(prev => ({
      ...prev,
      [selectedColumn]: {
        ...prev[selectedColumn],
        items: [newTask, ...prev[selectedColumn].items],
      },
    }));

    // (Stub) Persist newTask to your backend here.
    setTaskTitle('');
    setTaskDesc('');
  };

  // Function to delete a task given its column and id
  const deleteTask = (columnId, taskId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter(task => task.id !== taskId),
      },
    }));
    // (Stub) Persist deletion to your backend here.
  };

  // Helper: find the container (column) id for a given task id
  const getContainerId = (taskId) => {
    return Object.keys(columns).find(colId =>
      columns[colId].items.some(task => task.id === taskId)
    );
  };

  // Handler for when dragging starts (to show drag overlay, if desired)
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handler for drag end event (reordering within a column or moving across columns)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }
    const activeContainer = getContainerId(active.id);
    const overContainer = getContainerId(over.id) || activeContainer;

    // Reordering within the same column
    if (activeContainer === overContainer) {
      const column = columns[activeContainer];
      const oldIndex = column.items.findIndex(task => task.id === active.id);
      const newIndex = column.items.findIndex(task => task.id === over.id);
      if (oldIndex !== newIndex) {
        setColumns(prev => ({
          ...prev,
          [activeContainer]: {
            ...prev[activeContainer],
            items: arrayMove(column.items, oldIndex, newIndex),
          },
        }));
        // (Stub) Persist the new order in your backend.
      }
    } else {
      // Moving the task from one column to another
      const sourceColumn = columns[activeContainer];
      const destColumn = columns[overContainer];
      const movingTask = sourceColumn.items.find(task => task.id === active.id);
      if (movingTask) {
        const newSourceItems = sourceColumn.items.filter(task => task.id !== active.id);
        // For simplicity, add the task at the end of the destination column
        const newDestItems = [...destColumn.items, { ...movingTask, category: overContainer }];
        setColumns(prev => ({
          ...prev,
          [activeContainer]: { ...sourceColumn, items: newSourceItems },
          [overContainer]: { ...destColumn, items: newDestItems },
        }));
        // (Stub) Persist the cross‑column move to your backend.
      }
    }
    setActiveId(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Task Management Board</h1>
      
      {/* Add Task Form */}
      <div className="max-w-3xl mx-auto mb-8 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Title (max 50 characters)"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="border border-gray-300 rounded p-2"
            maxLength={50}
          />
          <textarea
            placeholder="Description (optional, max 200 characters)"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="border border-gray-300 rounded p-2"
            maxLength={200}
          />
          <div className="flex items-center space-x-4">
            <label className="font-medium">Category:</label>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              {Object.keys(columns).map((key) => (
                <option key={key} value={key}>
                  {columns[key].title}
                </option>
              ))}
            </select>
            <button
              onClick={addTask}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Drag and Drop Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex-1 bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4 text-center">{column.title}</h2>
              <SortableContext items={column.items.map(task => task.id)} strategy={verticalListSortingStrategy}>
                {column.items.map((task) => (
                  <SortableItem
                    key={task.id}
                    id={task.id}
                    task={task}
                    onDelete={(taskId) => deleteTask(columnId, taskId)}
                  />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            // Optionally render a drag preview for the active task
            (() => {
              const containerId = getContainerId(activeId);
              const activeTask = containerId
                ? columns[containerId].items.find(task => task.id === activeId)
                : null;
              return activeTask ? (
                <div className="bg-white p-4 rounded shadow border border-blue-400">
                  <h3 className="font-semibold text-lg">{activeTask.title}</h3>
                  {activeTask.description && (
                    <p className="text-gray-600 text-sm">{activeTask.description}</p>
                  )}
                </div>
              ) : null;
            })()
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskBoard;