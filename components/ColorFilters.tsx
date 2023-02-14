import { useState, useEffect } from "react";
import BlueRedGolden from "@/components/Filters/BlueRedGolden";
import Burn from "@/components/Filters/Burn";
import Cyberpunk2023 from "@/components/Filters/Cyberpunk2023";
import Cyberpunk2050 from "@/components/Filters/Cyberpunk2050";
import Cyberpunk2020 from "@/components/Filters/Cyberpunk2020";
import Cyberpunk2066 from "@/components/Filters/Cyberpunk2066";
import Cyberpunk2077 from "@/components/Filters/Cyberpunk2077";
import DarkRed from "@/components/Filters/DarkRed";
import Dunastone from "@/components/Filters/Dunastone";
import IceCream from "@/components/Filters/IceCream";
import IceCreamPlus from "@/components/Filters/IceCreamPlus";
import LinearBurn from "@/components/Filters/LinearBurn";
import NeonLights from "@/components/Filters/NeonLights";
import PinkBlue from "@/components/Filters/PinkBlue";
import PurpleRedOrange from "@/components/Filters/PurpleRedOrange";
// import Tester from "@/components/Filters/Tester";

const ColorFilters = () => {
  const [mounted, setMounted] = useState(false);

  const style = {
    display: "block",
    width: "auto !important",
    height: "0 !important",
  };

  useEffect(() => setMounted(true), []);

  return (
    <>
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="!block !w-auto !h-0"
          style={style}
        >
          <BlueRedGolden />
          <Burn />
          <Cyberpunk2023 />
          <Cyberpunk2066 />
          <Cyberpunk2020 />
          <Cyberpunk2050 />
          <Cyberpunk2077 />
          <DarkRed />
          <Dunastone />
          <IceCream />
          <IceCreamPlus />
          <LinearBurn />
          <NeonLights />
          <PinkBlue />
          <PurpleRedOrange />
          {/* <Tester /> */}
        </svg>
      )}
    </>
  );
};

export default ColorFilters;
