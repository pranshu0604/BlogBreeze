import React from "react";
import { AnimatedTooltip } from "./animated-tooltip"; // Adjust the path based on your project structure
import PP from '../../assets/PP.jpg'
import Homelander from '../../assets/Homelander.jpg'
import Gus from '../../assets/GusFring.jpg'
import Connor from '../../assets/ConnorMcGregor.jpeg'
import Adonis from '../../assets/AdonisCreed.jpeg'
import TylerDurden from '../../assets/TylerDurden.jpg'
const people = [
  {
    id: 1,
    name: "notoriousPran",
    designation: "Developer",
    image:
      PP,
  },
  {
    id: 2,
    name: "John Vogelbaum",
    designation: "Homelander",
    image:
      Homelander,
  },
  {
    id: 3,
    name: "Gustavo Fring",
    designation: "Los Pollos Hermanos",
    image:
      Gus,
  },
  {
    id: 4,
    name: "Tyler Durden",
    designation: "Project Mayhem",
    image:
      TylerDurden,
  },
  {
    id: 5,
    name: "Conor McGregor",
    designation: "Double Fookin Champ",
    image:
      Connor,
  },
  {
    id: 6,
    name: "Adonis Creed",
    designation: "Apollo's Blood",
    image:
      Adonis,
  },
];

export const DevPran: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
};
