import { AppProps } from "next/app";

import "@/assets/blklight.scss";
import "katex/dist/katex.css";
import "react-tooltip/dist/react-tooltip.css";

import Head from "next/head";
import Layout from "@/layouts/Layout";
import { ThemeProvider } from "next-themes";

import Barlow from "@/components/Fonts/Barlow";
import JetBrains from "@/components/Fonts/JetBrainsMono";
import IBMPlexSerif from "@/components/Fonts/IBMPlexSerif";

import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faSun,
  faMoon,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee, faSun, faMoon, faHome);

import { ClientReload } from "@/components/ClientReload";
const isDevelopment = process.env.NODE_ENV === "development";
const isSocket = process.env.SOCKET;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${Barlow.style.fontFamily};
          --font-serif: ${IBMPlexSerif.style.fontFamily};
          --font-mono: ${JetBrains.style.fontFamily}
				}
			}`}</style>
      <ThemeProvider enableSystem={true} attribute="class">
        {isDevelopment && isSocket && <ClientReload />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default App;
