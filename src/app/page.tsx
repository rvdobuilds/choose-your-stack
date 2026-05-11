import { HomeHero } from "@/components/HomeHero";
import { ThreeDirections } from "@/components/ThreeDirections";
import { ChoosePath } from "@/components/ChoosePath";
import { CostModelTeaser } from "@/components/CostModelTeaser";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ThreeDirections />
      <ChoosePath />
      <CostModelTeaser />
    </>
  );
}
