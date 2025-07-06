"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const sections = ["overview", "how to join", "motivation & benefits"];

const content: {
  [key: string]: { nodes: { type: string; content: string }[] };
} = {
  overview: {
    nodes: [
      {
        type: "h4",
        content: "Welcome to o1!",
      },
      {
        type: "p",
        content:
          "o1 is a product studio by axiom, dedicated to building innovative tech products. We serve as a hands-on platform for SVGU students to gain practical experience in developing scalable technology solutions. Our focus is on creating tangible, impactful products from concept to completion, allowing students to apply theoretical knowledge to real-world challenges in a professional production environment.",
      },
      {
        type: "p",
        content:
          "The studio operates on a structured, months-long process with flexible weekly stand-ups to accommodate student schedules. All our projects are open-source under GPLv3, promoting transparency, collaboration, and community contribution. With code reviews led by team leads, we ensure high-quality, functional code. As we grow, we aim to explore external initiatives like the AWS Student Club. o1 is an inclusive space for all SVGU students, welcoming contributions in management, development, design, and marketing, regardless of prior experience. Every contribution, whether it leads to a market-ready product or a valuable learning experience, becomes a significant addition to a student's resume.",
      },
    ],
  },
  "how to join": {
    nodes: [
      {
        type: "p",
        content:
          "Joining o1 is straightforward and accessible. We've eliminated formal applications to empower students to engage at their own pace. To get started, visit our GitHub repository, which is the central hub for all project information, including weekly progress logs and future plans. From there, navigate to the <code>axiom-svgu/o1/kb</code> folder—a comprehensive knowledge base designed like an Obsidian vault for easy navigation. It contains all essential documentation, project details, and team information.",
      },
      {
        type: "p",
        content:
          "Once you're oriented, you can start contributing by picking tasks from our GitHub issues. Our leads monitor critical tasks and are there to provide support. Communication happens on the 'axiom' Discord server, where you can connect with the team. You can contribute casually, picking up issues as you have time, or you can pursue a deeper commitment. For those seeking a specific role in design, architecture, development, management, or marketing, you can contact the respective team lead for more information on becoming a committed member with greater project involvement and mentorship.",
      },
    ],
  },
  "motivation & benefits": {
    nodes: [
      {
        type: "p",
        content:
          "Participation in o1 offers benefits that extend far beyond coding. We are committed to an environment where every student can grow. You will acquire concrete technical skills in programming and design, as well as crucial soft skills in project management, collaboration, and communication. We provide curated resources and mentorship to help you master the tech stack.",
      },
      {
        type: "p",
        content:
          "Every project contributes to a strong portfolio, demonstrating practical experience in a collaborative production environment. We regularly showcase project progress to the wider SVGU community and recognize significant contributions. More importantly, o1 is a community. We foster a supportive and inclusive atmosphere with social gatherings and peer-to-peer mentorship, creating strong connections. You'll have ownership over your work and see the direct impact of your contributions through transparent progress tracking on GitHub. Your voice matters, and we continuously use feedback to improve the o1 experience.",
      },
    ],
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
      <div className="flex flex-col items-center justify-center min-w-4xl max-w-4xl border-2 h-[50vh]">
        <div className="flex items-center justify-between w-full px-2 py-1">
          <h1 className="text-2xl font-bold">
            o1: Axiom&apos;s Production Studio
          </h1>
        </div>
        <div className="flex flex-col items-center justify-start w-full flex-1 border-b-2">
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
          <div className="flex flex-col items-start justify-start w-full text-base flex-1 p-2 font-sans overflow-y-auto min-h-0">
            {content[activeSection].nodes.map((node, index) => {
              if (node.type === "p") {
                return (
                  <p
                    key={index}
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  />
                );
              }
              if (node.type === "h4") {
                return (
                  <h4
                    key={index}
                    className="font-bold text-lg mb-2"
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  />
                );
              }
              if (node.type === "item") {
                return (
                  <p
                    key={index}
                    className="mb-2"
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center justify-start w-full px-2 py-1 gap-2">
            [space] {theme === "dark" ? "light mode" : "dark mode"}.
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
