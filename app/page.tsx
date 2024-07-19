"use client";

import React, { useState } from "react";
import { TaskProvider } from "../contexts/TaskContext";
import TaskInput from "../components/TaskInput";
import TaskSearch from "../components/TaskSearch";
import TaskList from "../components/TaskList";
import TaskFilterTabs from "../components/TaskFilterTabs";
import { Toaster } from "@/components/ui/toaster";
const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  return (
    <TaskProvider>
      <h1 className="text-3xl font-bold my-12  text-center">Todo List</h1>
      <div className="w-2/3 mx-auto my-10 p-4 border rounded-xl">
        <TaskInput />
        <TaskSearch query={query} setQuery={setQuery} />
        <TaskFilterTabs setFilter={setFilter} />
        <TaskList query={query} filter={filter} />
        <Toaster />
      </div>
    </TaskProvider>
  );
};

export default Home;
