
import { FlipWords } from "./flip-words";

export function HeroText() {
  const words = ["Insightful", "Engaging", "Trendy", "Inspiring"];

  return (
    <div className="flex justify-center items-center">
      <div className="text-3xl">
        Write
        <FlipWords words={words} /> 
        <div className="sm:hidden"></div>
        Blogs with BlogBreeze
      </div>
    </div>
  );
}
