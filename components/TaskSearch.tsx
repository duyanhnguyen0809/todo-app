"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface TaskSearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ query, setQuery }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="my-2">
      <Input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search a task..."
        className="border p-2 w-full mb-4"
      />
    </div>
  );
};

export default TaskSearch;
