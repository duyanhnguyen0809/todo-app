"use client";

import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <div className="flex my-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="border p-2 w-full"
      />
      <Button
        onClick={handleAddTask}
        className="bg-blue-500 text-white p-2 ml-2"
      >
        Add to list
      </Button>
    </div>
  );
};

export default TaskInput;
