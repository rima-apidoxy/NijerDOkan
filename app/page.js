import { BestDealCards } from "@/components/bestDealCards/bestDealCards";
import DailyEssentialsSection from "@/components/dailyEssentialsSection/dailyEssentialsSection";
import Slider from "@/components/slider/slider";
import TopBrandsSection from "@/components/topBrandsSection/topBrandsSection";
import TopCategories from "@/components/topCategories/topCategories";
import PageNotFound from "./pageNotFound";

export default function Home() {
  return (
    <div>
      <Slider></Slider>
      <BestDealCards title="Grab the best deal on Smartphones" />
      <TopCategories title="Shop From Top Categories"></TopCategories>
      <TopBrandsSection title="Top Electronics Brands"></TopBrandsSection>
      <DailyEssentialsSection title="Daily Essentials"></DailyEssentialsSection>
    </div>
  );
}
