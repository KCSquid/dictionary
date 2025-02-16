"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant={"outline"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="absolute bottom-4 left-4 text-xl text-gray-600 w-8 h-8 p-0"
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
