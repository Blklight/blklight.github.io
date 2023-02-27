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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavigationBar = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`flex justify-between items-center px-5 sticky top-0 dark:bg-dark-500 bg-light-500 shrink z-[100] h-16 w-full`}
    >
      <nav className="grow">
        <div className="">
          <div className="flex grow items-center justify-between flex-row ">
            <div className="flex items-center text-center">
              <Link href="/">
                <img
                  src="/blklight-white.svg"
                  className="!max-w-none mx-auto hidden dark:block"
                  width="50"
                  height="50"
                  alt="Ultimate Mercer Logo"
                />
              </Link>

              <Link href="/">
                <img
                  src="/blklight-black.svg"
                  className="!max-w-none mx-auto block dark:hidden"
                  width="50"
                  height="50"
                  alt="Ultimate Mercer Logo"
                />
              </Link>
            </div>
            <div className="block">
              {/* <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Canais</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link href="/">
                              <div className="card view-anchor !my-0">
                                <img
                                  src="https://i.imgur.com/qOEajoe.jpg"
                                  className="rounded-lg w-full h-64 scale-125 object-cover"
                                  alt=""
                                />
                                <div className="mask bg-dark-500/[.4]"></div>
                                <Link
                                  href="/"
                                  className="card-img-overlay flex flex-col justify-end"
                                >
                                  <div className="mt-auto text-lg font-medium text-white">
                                    shadcn/ui
                                  </div>
                                </Link>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cyan-300 to-uv-500 p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium text-white">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                Beautifully designed components built with Radix
                                UI and Tailwind CSS.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <div className="">
                          <li>
                            Re-usable components built using Radix UI and
                            Tailwind CSS.
                          </li>
                          <li>
                            Re-usable components built using Radix UI and
                            Tailwind CSS.
                          </li>
                          <li>
                            Re-usable components built using Radix UI and
                            Tailwind CSS.
                          </li>
                          <li>
                            Re-usable components built using Radix UI and
                            Tailwind CSS.
                          </li>
                        </div>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu> */}
            </div>
            <div className="block px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="ml-6"
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
                <TooltipContent align="center" side="left">
                  <p className="hidden dark:block">Modo claro</p>
                  <p className="block dark:hidden">Modo escuro</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
