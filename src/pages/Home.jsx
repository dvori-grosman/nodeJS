import React from "react";
import HomePageHeroSection from "../components/home/HomePageHeroSection";
import DanceStylesSection from "../components/home/DanceStylesSection";
import HomeGroupsLevelsSection from "../components/home/HomeGroupsLevelsSection";
import StudioLocationsPreview from "../components/home/StudioLocationsPreview";
import HomeTeamPhilosophySection from "../components/home/HomeTeamPhilosophySection";
import HomeDetailedClassesSection from "../components/home/HomeDetailedClassesSection";
import HomeHowToRegisterSection from "../components/home/HomeHowToRegisterSection";
import HomeFinalCtaSection from "../components/home/HomeFinalCtaSection";

export default function HomePage() {
 
  return (
    <div >
      <HomePageHeroSection />
      <DanceStylesSection />
      <HomeGroupsLevelsSection />
      <StudioLocationsPreview />
      <HomeTeamPhilosophySection />
      <HomeDetailedClassesSection />
      <HomeHowToRegisterSection />
      <HomeFinalCtaSection />
    </div>
  );
}