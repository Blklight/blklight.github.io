import dynamic from "next/dynamic";

import { useMDXComponent } from "next-contentlayer/hooks";
import TOCInline from "./ArticleRelated/TOCInline";
import Pre from "./ArticleRelated/Pre";

const components = {
  TOCInline,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = dynamic(() => import(`./ArticleLayouts/${layout}`));
    return <Layout {...rest} />;
  },
};

export const MDXComponents = ({ layout, code, ...rest }: any) => {
  const Component = useMDXComponent(code);
  return <Component layout={layout} components={components} {...rest} />;
};
