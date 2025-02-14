"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(false);
  const randomWord = useRef("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/refs/heads/master/meta/wordList/english.txt"
    ).then(async (response) => {
      const data = await response.text();
      const words = data
        .split("\n")
        .filter(
          (word) =>
            word.length >= 3 && !word.includes("-") && !word.includes(" ")
        );
      randomWord.current = words[Math.floor(Math.random() * words.length)];
    });
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen gap-4 transition-opacity ease-in duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">Dictionary</h1>
        <p className="text-lg text-gray-600">Search for a word!</p>
      </div>

      <div className="flex space-x-2">
        <Input placeholder="curiosity..." id="searchValue" autoComplete="off" />
        <Button
          variant="outline"
          onClick={() =>
            router.push(
              `/${
                (document.getElementById("searchValue") as HTMLInputElement)
                  ?.value
              }`
            )
          }
        >
          Search
        </Button>
      </div>
      <Button
        variant="outline"
        onClick={() => router.push(`/${randomWord.current}`)}
      >
        Random
      </Button>
    </div>
  );
}
