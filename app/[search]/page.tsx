"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const params = useParams();
  const router = useRouter();
  const { search } = params;

  const [definition, setDefinition] = useState({
    phonetic: "/ˈləʊ.dɪŋ/",
    meanings: [
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition:
              "To put a load on or in (a means of conveyance or a place of storage).<br /><br />Please wait while we fetch the definition for you.",
            example: "",
          },
        ],
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDefinition(search: string) {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      if (response.status === 404) {
        setDefinition({
          phonetic: "/fɔːr əʊ fɔːr/",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition:
                    "an error message displayed by a browser indicating that an internet address cannot be found.<br /><br />Sorry, this word isn't in our dictionary!",
                  example: "I got a 404 error when I tried to visit that page.",
                },
              ],
            },
          ],
        });
        setLoading(false);
        return;
      }

      const data = await response.json();
      setDefinition(data[0]);

      if (data[0].phonetics) {
        for (const phonetic of data[0].phonetics) {
          if (phonetic.text) {
            setDefinition((prev) => ({ ...prev, phonetic: phonetic.text }));
            break;
          }
        }
      }

      setLoading(false);
    }

    getDefinition(search as string);
  }, [search]);

  useEffect(() => {
    if (!loading) {
      document.title = `${(
        (search as string).charAt(0).toUpperCase() + (search as string).slice(1)
      ).replace(/%20/g, " ")} ~ Dictionary`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          definition.meanings[0].definitions[0].definition
        );
    }
  }, [loading, search, definition]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-opacity ease-in duration-500 ${
        loading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-1/2 max-w-[512px] flex flex-col justify-center h-screen gap-8 break-words">
        {/* Word */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-5xl">
            {definition.phonetic == "/fɔːr əʊ fɔːr/"
              ? "404"
              : definition.meanings[0].definitions[0].definition.includes(
                  "<br />"
                )
              ? "loading..."
              : search}
          </h1>
          <h3 className="font-base text-lg">
            {definition.phonetic ? `[ ${definition.phonetic} ]` : ""}{" "}
            {definition.meanings[0].partOfSpeech}
          </h3>
        </div>

        {/* Seperator */}
        <div className="w-2/5 bg-black h-1"></div>

        {/* Definition */}
        <div className="flex flex-col gap-4">
          {definition.meanings.map((meaning, index) => (
            <div key={index} className="flex gap-4">
              <p className="font-semibold text-sm mt-1">{index + 1}.</p>
              <div className="flex flex-col gap-2">
                <p className="font-base text-lg">
                  {meaning.definitions[0].definition
                    .split("<br />")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
                {meaning.definitions[0].example && (
                  <p className="font-base text-base text-gray-600">
                    {meaning.definitions[0].example
                      .split("<br />")
                      .map((line, index) => (
                        <span key={index}>
                          &quot;
                          {line}
                          &quot;
                          <br />
                        </span>
                      ))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Return */}
        <Button variant="outline" onClick={() => router.replace("/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
