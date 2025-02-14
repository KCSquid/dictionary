"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page404() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-opacity ease-in duration-500 ${
        loading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-1/2 flex flex-col justify-center h-screen gap-8">
        {/* Word */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-5xl">404</h1>
          <h3 className="font-base text-lg">[ /fɔːr əʊ fɔːr/ ] noun</h3>
        </div>

        {/* Seperator */}
        <div className="w-2/5 bg-black h-1"></div>

        {/* Definition */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <p className="font-semibold text-sm mt-1">1.</p>
            <div className="flex flex-col gap-2">
              <p className="font-base text-lg">
                an error message displayed by a browser indicating that an
                internet address cannot be found.
                <br />
                <br />
                Sorry, this word isn&apos;t in our dictionary!
              </p>
              <p className="font-base text-base text-gray-600">
                &quot;I got a 404 error when I tried to visit that page.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Return */}
        <Button variant="outline" onClick={() => router.replace("/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
