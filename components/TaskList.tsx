"use client";

import React, { useState } from "react";
import { useTasks, Task } from "../contexts/TaskContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface TaskListProps {
  query: string;
  filter: string;
}

const TaskList: React.FC<TaskListProps> = ({ query, filter }) => {
  const { tasks, toggleTaskCompletion, deleteTask, modifyTask } = useTasks();
  const { toast } = useToast(); // Initialize useToast hook
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleModify = (task: Task) => {
    if (editTaskId === task.id) {
      modifyTask(task.id, newTitle);
      setEditTaskId(null);
    } else {
      setEditTaskId(task.id);
      setNewTitle(task.title);
    }
  };

  const handleToggleCompletion = (task: Task) => {
    toggleTaskCompletion(task.id);
    const toastMessage = task.completed
      ? "Marked task as unfinished"
      : "Marked task as completed";
    toast({
      title: toastMessage,
      description: task.title,
    });
  };

  const handleDelete = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      deleteTask(taskId);
      toast({
        title: "Task deleted",
        description: taskToDelete.title,
      });
    }
  };

  // Function to truncate the task title to 100 characters with "..."
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Filter tasks based on query and filter
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "finished") return task.completed;
      if (filter === "unfinished") return !task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-3/5">Task</TableHead>
          <TableHead className="w-1/5 text-center">Status</TableHead>
          <TableHead className="w-1/5 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Check if filteredTasks array is empty */}
        {filteredTasks.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No tasks found.
            </TableCell>
          </TableRow>
        ) : (
          // Render each task in filteredTasks
          filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium" style={{ maxWidth: "300px" }}>
                {editTaskId === task.id ? (
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border p-2 w-full"
                  />
                ) : (
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {truncateText(task.title, 100)}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center">
                {task.completed ? "Completed" : "Unfinished"}
              </TableCell>
              <TableCell className="flex justify-between space-x-2">
                <Button onClick={() => handleToggleCompletion(task)}>
                  {task.completed ? "Mark Unfinished" : "Mark Completed"}
                </Button>
                {!task.completed && (
                  <Button
                    onClick={() => handleModify(task)}
                    disabled={editTaskId === task.id && newTitle.length === 0}
                  >
                    {editTaskId === task.id ? "Save" : "Edit"}
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(task.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TaskList;
