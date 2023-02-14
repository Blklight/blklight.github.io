import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`flex justify-between items-center md:flex-col md:self-start sticky top-0 md:bg-transparent dark:bg-dark-500 bg-light-500 shrink z-[100] md:h-screen md:min-h-screen h-20 md:w-20 w-full md:border-r md:border-gray`}
    >
      <nav className="md:h-full grow">
        <div className="md:h-full">
          <div className="flex grow items-center justify-between md:flex-col flex-row md:h-screen">
            <div className="flex md:flex-col items-center text-center md:py-8 md:px-0 px-4">
              <Link href="/">
                <img
                  src="/blklight-white.svg"
                  className="mx-auto md:mb-6 hidden dark:block"
                  width="50"
                  height="50"
                  alt="Ultimate Mercer Logo"
                />
              </Link>

              <Link href="/">
                <img
                  src="/blklight-black.svg"
                  className="mx-auto md:mb-6 block dark:hidden"
                  width="50"
                  height="50"
                  alt="Ultimate Mercer Logo"
                />
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="md:ml-0 ml-6"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setTheme(currentTheme === "dark" ? "light" : "dark")
                    }
                  >
                    {mounted && (
                      <>
                        <SunMedium className="hidden dark:block" />
                        <Moon className="block dark:hidden" />
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="center" side="right">
                  <p className="hidden dark:block">Modo claro</p>
                  <p className="block dark:hidden">Modo escuro</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="block"></div>
            <div className="block md:px-0 px-3"></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
