import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function PrayToLeBron() {
  const [prayers, setPrayers] = useState(0);
  const [hasPrayed, setHasPrayed] = useState(false);

  useEffect(() => {
    const lastPrayer = localStorage.getItem("lastPrayer");
    const prayerCount = localStorage.getItem("prayers") || 0;
    setPrayers(parseInt(prayerCount, 10));
    if (lastPrayer === new Date().toDateString()) {
      setHasPrayed(true);
    }
  }, []);

  const pray = () => {
    if (hasPrayed) return;
    const newCount = prayers + 1;
    setPrayers(newCount);
    setHasPrayed(true);
    localStorage.setItem("prayers", newCount);
    localStorage.setItem("lastPrayer", new Date().toDateString());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <Card className="p-6 text-center bg-gray-800 shadow-lg">
        <CardContent>
          <motion.img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/25/LeBron_James_Lakers.jpg" 
            alt="LeBron James"
            className="w-48 h-48 rounded-full mx-auto mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
          <h1 className="text-2xl font-bold">Pray to LeBron</h1>
          <p className="mt-2">Total Prayers: {prayers}</p>
          <Button 
            onClick={pray} 
            disabled={hasPrayed} 
            className="mt-4 bg-yellow-500 text-black hover:bg-yellow-400">
            {hasPrayed ? "You have already prayed today" : "Pray Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
