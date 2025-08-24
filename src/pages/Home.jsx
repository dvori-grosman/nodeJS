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
    <> 
     <Helmet>
        <title>ריקוד ברוח הטובה – בית ספר למחול</title>
        <meta name="description" content="שיעורי מחול מקצועיים בסגנון קלאסי-מודרני, אווירה חמה ומקצועיות." />
        <link rel="canonical" href="https://rikud.netlify.app/" />
      </Helmet>
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
    </>
  );
}