import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotFound = () => {
  return (
    <>
      <div className="card !my-0">
        <img
          src="https://i.imgur.com/ehfbNpw.jpg"
          className="notfound-page filter-cyberpunk-v"
          alt=""
        />
        <div className="card-img-overlay flex flex-col justify-center !p-8">
          <h1 className="text-6xl font-bold text-light-500 font-mono">
            404 - Not Found
          </h1>
          <div className="">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium transition-colors bg-uv-500 text-light-500 py-2 px-4 rounded-md focus:outline-none hover:ring-2 hover:ring-uv-300 "
            >
              <FontAwesomeIcon icon={faHome} className="mr-2 w-4 h-4" />
              Retornar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
