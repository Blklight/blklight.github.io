import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageSEO } from "@/components/SEO";

import siteMetadata from "@/lib/siteMetadata";

const About = () => {
  return (
    <>
      <PageSEO
        title={`Sobre - ${siteMetadata.title}`}
        description={`Sobre - ${siteMetadata.description}`}
      />
      <div>
        <div className="container mx-auto py-2 mb-5">
          <div className="py-4">
            <img
              src="/blklight-white.svg"
              className="mx-auto hidden dark:block"
              width="150"
              height="150"
              alt="Ultimate Mercer Logo"
            />

            <img
              src="/blklight-black.svg"
              className="mx-auto block dark:hidden"
              width="150"
              height="150"
              alt="Ultimate Mercer Logo"
            />
          </div>

          <h1 className="text-5xl font-bold text-center border-b border-dark-500 dark:border-light-500 mb-5 tracking-wide">
            Sobre Blklight
          </h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Objetivo</AccordionTrigger>
              <AccordionContent>
                Atualmente nosso objetivo é poder desenvolver esta ideia junto
                do nosso circulo de amigos, e inicialmente através da
                disponibilização de artigos, desenvolver habilidades, trabalhar
                a criatividade e quem sabe isso não a base para um projeto
                maior.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Membros</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components' aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default About;
