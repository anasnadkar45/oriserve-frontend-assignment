import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Laptop, Server, Terminal, FileText, Paintbrush, ShieldCheck, Smartphone, Cog, Square } from "lucide-react";
import { BsRobot } from "react-icons/bs";

const categories = [
  { name: "Front-end", icon: <Laptop className="h-6 w-6" /> },
  { name: "Back-end", icon: <Server className="h-6 w-6" /> },
  { name: "CLI", icon: <Terminal className="h-6 w-6" /> },
  { name: "Documentation", icon: <FileText className="h-6 w-6" /> },
  { name: "CSS", icon: <Paintbrush className="h-6 w-6" /> },
  { name: "Testing", icon: <ShieldCheck className="h-6 w-6" /> },
  { name: "IoT", icon: <Cog className="h-6 w-6" /> },
  { name: "Coverage", icon: <Square className="h-6 w-6" /> },
  { name: "Mobile", icon: <Smartphone className="h-6 w-6" /> },
  { name: "Frameworks", icon: <Cog className="h-6 w-6" /> },
  { name: "Robotics", icon: <BsRobot className="h-6 w-6" /> },
  { name: "Math", icon: <Square className="h-6 w-6" /> },
];

const DiscoverPackages = ({ setCategory }: { setCategory: (name: string) => void }) => {
  const categoryHandler = (name: string) => {
    setCategory(name);
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="h-5 w-5" />
          Discover Packages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Button
              key={category.name}
              onClick={() => categoryHandler(category.name)}
              variant="outline"
              className="h-auto flex-col py-4"
            >
              {category.icon}
              <span className="mt-2">{category.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoverPackages;
