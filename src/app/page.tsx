"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const sections = ["overview", "how to join", "roadmap"];

const content: { [key: string]: { lines: string[] } } = {
  overview: {
    lines: [
      "o1 is a product studio workshop where the students of svgu build projects together.",
    ],
  },
  "how to join": {
    lines: ["details coming soon."],
  },
  roadmap: {
    lines: ["details coming soon."],
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>(sections[0]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          setTheme(theme === "dark" ? "light" : "dark");
          break;
        case "d":
          window.open("https://discord.com", "_blank");
          break;
        case "g":
          window.open("https://github.com", "_blank");
          break;
        case "t":
          window.open("https://twitter.com", "_blank");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [theme, setTheme]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-background font-mono text-sm p-4 md:p-0">
      <div className="flex flex-col items-center justify-center min-w-4xl max-w-4xl border-2 h-[60vh]">
        <div className="flex items-center justify-between w-full px-2 py-1">
          <h1 className="text-2xl font-bold">o1</h1>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold underline underline-primary cursor-pointer hover:bg-primary hover:text-primary-foreground">
              axiom
            </span>
            &apos;s product studio.
          </p>
        </div>
        <div className="flex flex-col items-center justify-start w-full h-full border-b-2">
          <div className="flex flex-row gap-2 w-full border-y-2">
            {sections.map((section) => (
              <div
                key={section}
                className={`px-2 py-1 cursor-pointer select-none ${
                  activeSection === section
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setActiveSection(section)}
              >
                <h2 className="">{section}</h2>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-start w-full text-base h-full p-2 font-sans">
            {content[activeSection].lines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center justify-start w-full px-2 py-1 gap-2">
            [space] dark mode.
          </div>
          <div className="flex items-center justify-end w-full px-2 py-1 gap-2">
            {["[d]iscord", "[t]witter", "[g]ithub"].map((item, i) => (
              <div key={item} className="flex flex-row items-center gap-2">
                <a
                  href={`https://${item}.com`}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  {item}
                </a>
                {i < 2 && (
                  <span className="text-sm text-muted-foreground">{"/"}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
