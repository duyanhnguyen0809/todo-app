"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TaskFilterTabsProps {
  setFilter: (filter: string) => void;
}

const TaskFilterTabs: React.FC<TaskFilterTabsProps> = ({ setFilter }) => {
  const handleTabChange = (value: string) => {
    setFilter(value);
  };

  return (
    <Tabs defaultValue="all" onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="unfinished">Unfinished</TabsTrigger>
        <TabsTrigger value="finished">Finished</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TaskFilterTabs;
