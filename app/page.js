
import { ProductCards } from "@/components/productCards/productCards";
import DailyEssentialsSection from "@/components/dailyEssentialsSection/dailyEssentialsSection";
import Slider from "@/components/slider/slider";
import TopBrandsSection from "@/components/topBrandsSection/topBrandsSection";
import TopCategories from "@/components/topCategories/topCategories";

export default function Home() {
  return (
    <div>
      <Slider></Slider>
      <ProductCards />
      {/* <TopCategories title="Shop From Top Categories"></TopCategories> */}
      {/* <TopBrandsSection title="Top Electronics Brands"></TopBrandsSection> */}
      {/* <DailyEssentialsSection title="Daily Essentials"></DailyEssentialsSection> */}
    </div>
  );
}
