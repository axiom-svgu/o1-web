"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const content: Record<string, { title: string; lines: string[] }> = {
  crux: {
    title: "Crux",
    lines: [
      "o1 is Axiom's product studio, dedicated to building and shipping real-world, scalable software.",
      "We're a collective of SVGU students gaining hands-on experience in a collaborative team environment.",
      "Our multi-month project cycles are structured with weekly sprints, focusing on MVP development, polishing, and continuous learning.",
    ],
  },
  roadmap: {
    title: "Roadmap",
    lines: [
      "Week 1: Introduction to o1's purpose, process, and goals; initial brainstorming for innovative project ideas.",
      "Week 2: Final project selection via community vote (leads decide ties); initial technical scoping and tech stack discussions, providing learning resources (no coding yet).",
      "Week 3-5: Deeper tech stack learning, architecture and design brainstorming, formal team formation, and initial task assignments on GitHub.",
      "Week 6 onwards: Weekly stand-ups, iterative development, and continuous inter-team communication.",
    ],
  },
  structure: {
    title: "Structure",
    lines: [
      "We begin as a single team, brainstorming and defining our product vision through consensus or lead decisions.",
      "Once the project is concrete, we form specialized teams: Design (Vaidehi Shah), Architecture (Deepraj Bhati), and Development (Vinesh Rajpurohit).",
      "Team leads manage their work and guide members, conducting code reviews and ensuring tasks are completed.",
      "Inter-team communication is maintained through a weekly touchpoint and our Discord server.",
    ],
  },
  "how-to-join": {
    title: "How to Join",
    lines: [
      "o1 is open to all SVGU students, offering roles in management, development, design, marketing, and more.",
      "Onboard yourself via our `axiom-svgu/o1/kb` GitHub folder, containing all project documentation and weekly updates.",
      "Tasks are managed on GitHub issues; pick what interests you! For deeper commitment or specific roles, contact a team lead.",
      "Join our community on the Axiom Discord server for communication and updates.",
    ],
  },
};

const menuItems = [
  {
    category: "~ o1 ~",
    items: [
      { id: "crux", name: "crux" },
      { id: "roadmap", name: "roadmap" },
      { id: "structure", name: "structure" },
    ],
  },
  {
    category: "~ community ~",
    items: [{ id: "how-to-join", name: "how to join" }],
  },
];

const allItems = menuItems.flatMap((menu) => menu.items);

export default function Home() {
  const [activeView, setActiveView] = useState("crux");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedContent = content[activeView];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isMobileMenuOpen) {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
        return;
      }
      // prevent search bar from opening on /
      if (e.key === "/") {
        e.preventDefault();
      }

      const currentIndex = allItems.findIndex((item) => item.id === activeView);

      // Navigational shortcuts
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex =
          currentIndex === -1 ? 0 : (currentIndex + 1) % allItems.length;
        setActiveView(allItems[nextIndex].id);
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          currentIndex <= 0
            ? allItems.length - 1
            : (currentIndex - 1) % allItems.length;
        setActiveView(allItems[prevIndex].id);
      }

      // Action shortcuts
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

      switch (e.key) {
        case "g": {
          window.open("https://github.com/axiom-svgu/o1", "_blank");
          break;
        }
        case "d": {
          window.open("https://discord.gg/gnT8W2pHzd", "_blank");
          break;
        }
        case "a":
          window.open("https://axiomclub.tech", "_blank");
          break;
        case "x":
          window.open("https://x.com/axiom_svgu", "_blank");
          break;
      }
    },
    [activeView, isMobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      {menuItems.map((menu) => (
        <div key={menu.category} className="mb-4">
          <h2 className="px-1">{menu.category}</h2>
          <ul>
            {menu.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block w-full text-left px-1 py-0.5 ${
                    activeView === item.id
                      ? "bg-primary"
                      : "hover:bg-secondary text-muted-foreground"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveView(item.id);
                    if (onLinkClick) onLinkClick();
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <main className="flex items-center justify-center min-h-screen bg-background font-mono text-sm p-4 md:p-0">
      <div className="w-full max-w-3xl border-2 flex flex-col md:h-[36rem] relative">
        <header className="flex items-center justify-between border-b-2">
          <div className="px-3 bg-primary p-1 text-lg">o1</div>
          <div className="md:hidden pr-2">
            <button
              className="p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[41px] left-0 w-full h-[calc(100%-41px)] bg-background z-10 p-4">
            <NavContent onLinkClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:flex-grow md:min-h-0">
          <nav className="hidden md:block w-full md:w-1/4 py-4 border-b-2 md:border-b-0 md:border-r-2 md:overflow-y-auto">
            <NavContent />
          </nav>

          <div className="w-full md:w-3/4 p-4 md:overflow-y-auto text-white/85 lowercase">
            {selectedContent && (
              <>
                <h1 className="mb-2 text-lg text-primary">
                  {selectedContent.title}
                </h1>
                {selectedContent.lines.map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-center md:justify-end px-4 py-2 gap-4 border-t-2 text-muted-foreground">
          <a
            href="https://axiomclub.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            [a] axiom
          </a>
          <a
            href="https://x.com/axiom_svgu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            [x] x/twitter
          </a>
          <a
            href="https://github.com/axiom-svgu/o1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            [g] github
          </a>
          <a
            href="https://discord.gg/gnT8W2pHzd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            [d] discord
          </a>
        </footer>
      </div>
    </main>
  );
}
