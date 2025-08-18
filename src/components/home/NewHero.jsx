import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

export default function NewHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center dark-bg overflow-hidden text-center">
      <div className="absolute inset-0">
        <div className="sparkles" style={{top: '20%', right: '15%'}}></div>
        <div className="sparkles" style={{top: '30%', left: '20%', animationDelay: '1s'}}></div>
        <div className="sparkles" style={{bottom: '40%', left: '30%', animationDelay: '1.5s'}}></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <img 
          src="/logo.png" 
          alt="לוגו ריקוד ברוח הטובה" 
          className="h-32 w-auto mx-auto mb-8" 
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gold-text">
          ברוכה הבאה לריקוד ברוח הטובה!
        </h1>
        <div className="text-lg md:text-xl text-gray-300 space-y-4">
          <p>בשבילנו ריקוד הינו כלי מבורך לבריאות הגוף והנפש המעניק לכל אחת מתלמידותינו כל כך הרבה טוב!</p>
          <p>הדרך שאנו עוברות יחד, במקצועיות באהבה ובכיף, יפה ומרגשת.</p>
          <p className="font-semibold pink-text">ולפני הכל, באווירה איכותית ושמורה ברוח הטובה!!</p>
        </div>
      </div>
    </section>
  );
}