import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageSEO } from "@/components/SEO";

import siteMetadata from "@/lib/siteMetadata";

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/contacts");
//   const contacts = await res.json();

//   return {
//     props: {
//       contacts,
//     },
//   };
// }

const About = ({ contacts }: any) => {
  // console.log(contacts);
  const members = [
    {
      name: "Ultimate Mercer",
      avatar: "https://i.imgur.com/jZvckfb.jpg",
      role: ["Desenvolvedor Front-end", "Designer"],
      bio: "Formado em tecnologia em sistemas para internet no IFSul, atualmente sou estudante de design digital na UFPel, e moro em Pelotas/RS.",
    },
    {
      name: "Tanuke Sensei",
      avatar: "https://i.imgur.com/s7jHEMX.jpg",
      role: ["Desenvolvedor Back-end"],
      bio: "Dev formado em Tecnologia em Sistemas para Internet no IFsul, otaku, gamer, suporte e principal personagem na saga Vitola Wars. 29 anos e atuando como desenvolvedor back-end no Blklight.",
    },
  ];
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
              <AccordionTrigger>
                <h4 className="text-2xl tracking-wide"> Objetivo</h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <p className="text-lg">
                    Atualmente nosso objetivo é poder desenvolver esta ideia
                    junto do nosso circulo de amigos, e inicialmente através da
                    disponibilização de artigos, desenvolver habilidades,
                    trabalhar a criatividade e quem sabe isso não a base para um
                    projeto maior.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <h4 className="text-2xl tracking-wide">Time</h4>
              </AccordionTrigger>
              <AccordionContent>
                {members.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center px-2 mb-3"
                  >
                    <img
                      src={member.avatar}
                      className="w-40 h-40 object-cover rounded"
                      alt=""
                    />
                    <div className="ml-4 flex flex-col flex-1 justify-center">
                      <h4 className="text-2xl font-bold">{member.name}</h4>
                      <div className="flex gap-1 mb-1">
                        {member.role.map((role) => (
                          <span
                            key={role}
                            className="text-sm text-dark-500 border border-dark-500 dark:text-light-500 dark:border-light-500 py-1 px-2 rounded"
                          >
                            {role}
                          </span>
                        ))}
                      </div>

                      <p className="text-lg">{member.bio}</p>
                    </div>
                  </div>
                ))}
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
