
import { Features } from "./features";
import { Hero } from "./hero";

export const Landing = () => {
  return (
    <div className="flex-col justify-items-center items-center">
      <Hero />
      <Features />
    </div>
  );
};
