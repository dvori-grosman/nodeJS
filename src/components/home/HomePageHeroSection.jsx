import React from "react";

// קומפוננטת גיבור ראשית של עמוד הבית
export default function HomePageHeroSection() {
  const studioLogoUrl = "/logo.png"; 
  
  return (
    <section className="relative darker-bg py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
      <HeroBackgroundDecorations />
      <HeroContent logoUrl={studioLogoUrl} />
    </section>
  );
}

// קומפוננטת אלמנטים דקורטיביים לרקע
function HeroBackgroundDecorations() {
  const sparklePositions = [
    { top: '20%', right: '15%', delay: '0s' },
    { top: '30%', left: '20%', delay: '1s' },
    { bottom: '40%', left: '30%', delay: '1.5s' }
  ];

  return (
    <div className="absolute inset-1">
      {sparklePositions.map((position, index) => (
        <div
          key={index}
          className="sparkles"
          style={{
            top: position.top,
            right: position.right,
            left: position.left,
            bottom: position.bottom,
            animationDelay: position.delay
          }}
        />
      ))}
    </div>
  );
}

// קומפוננטת תוכן מרכזי של הגיבור
function HeroContent({ logoUrl }) {
  const welcomeMessages = [
    "בשבילנו ריקוד הינו כלי מבורך לבריאות הגוף והנפש המעניק לכל אחת מתלמידותינו כל כך הרבה טוב!",
    "הדרך שאנו עוברות יחד, במקצועיות באהבה ובכיף, יפה ומרגשת.",
    "ולפני הכל, באווירה איכותית ושמורה!!",
    "ברוח הטובה!!!"
  ];

  return (
    <div className="z-10 max-w-4xl mx-auto px-6">
      <StudioLogo logoUrl={logoUrl} />
      <WelcomeTitle />
      <WelcomeMessages messages={welcomeMessages} />
    </div>
  );
}

// קומפוננטת לוגו הסטודיו
function StudioLogo({ logoUrl }) {
  return (
    <img 
      src={logoUrl} 
      alt="לוגו ריקוד ברוח הטובה" 
      className="h-32 w-auto mx-auto mb-8" 
    />
  );
}

// קומפוננטת כותרת ברכת הבאה
function WelcomeTitle() {
  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-6 gold-text">
      ברוכה הבאה לריקוד ברוח הטובה!
    </h1>
  );
}

// קומפוננטת הודעות ברכה
function WelcomeMessages({ messages }) {
  return (
    <div className="text-lg md:text-xl text-gray-300 space-y-4">
      {messages.map((message, index) => (
        <WelcomeMessage 
          key={index} 
          message={message} 
          isHighlighted={index === messages.length - 1} 
        />
      ))}
    </div>
  );
}

// קומפוננטת הודעת ברכה יחידה
function WelcomeMessage({ message, isHighlighted = false }) {
  return (
    <p className={isHighlighted ? "font-semibold pink-text" : ""}>
      {message}
    </p>
  );
}