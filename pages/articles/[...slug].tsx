import { MDXComponents } from "@/components/Mdx";
import { getDocument, rawDocuments } from "@/lib/services";

const DEFAULT_LAYOUT = "FullpageLayout";

export async function getStaticPaths() {
  const paths = rawDocuments.map((doc: any) => doc.slug);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // return { props: params };
  return getDocument(params);
}

const Doc = ({ doc, authordetails, prev, next }: any) => {
  return (
    <>
      <MDXComponents
        layout={doc.layout ?? DEFAULT_LAYOUT}
        doc={doc}
        code={doc.body.code}
        authordetails={authordetails}
        prev={prev}
        next={next}
      />
    </>
  );
};

// const Doc = ({ params }: any) => {
//   console.log(params);
//   const test = params;
//   const router = useRouter();
//   console.log(router);
//   return (
//     <>
//       <div className="">
//         <h1 className="font-bold text-4xl">Testing Params</h1>
//         <pre>{test}</pre>
//       </div>
//     </>
//   );
// };

export default Doc;
