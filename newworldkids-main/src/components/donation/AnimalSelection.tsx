
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bird, Rabbit, Mouse } from "lucide-react";

interface AnimalSelectionProps {
  selectedAnimal: string;
  setSelectedAnimal: (animal: string) => void;
}

const AnimalSelection = ({ selectedAnimal, setSelectedAnimal }: AnimalSelectionProps) => {
  const animalOptions = [
    { id: "bird", name: "Rainforest Bird", icon: <Bird className="h-6 w-6" /> },
    { id: "rabbit", name: "Savanna Rabbit", icon: <Rabbit className="h-6 w-6" /> },
    { id: "other", name: "Endangered Species", icon: <Mouse className="h-6 w-6" /> },
  ];

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Select NFT Animal Theme
      </label>
      <div className="grid grid-cols-3 gap-3">
        {animalOptions.map((animal) => (
          <Button
            key={animal.id}
            type="button"
            variant={selectedAnimal === animal.id ? "default" : "outline"}
            className={`flex items-center justify-center gap-2 ${
              selectedAnimal === animal.id ? "bg-[#F2FF44] text-black" : ""
            }`}
            onClick={() => setSelectedAnimal(animal.id)}
          >
            {animal.icon}
            <span>{animal.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AnimalSelection;
