/* eslint-disable react/display-name */
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "./Image";
import CustomLink from "./Link";
import TOCInline from "./ArticleRelated/TOCInline";
import Pre from "./ArticleRelated/Pre";

// import BasicLayout from "./ArticleLayouts/BasicLayout";
// import FullpageLayout from "./ArticleLayouts/FullpageLayout";
// import PortraitLayout from "./ArticleLayouts/PortraitLayout";
import dynamic from "next/dynamic";
// const components = {
//   BasicLayout: BasicLayout,
//   FullpageLayout: FullpageLayout,
//   PortraitLayout: PortraitLayout,
// };
// const LayoutLoader = (props: any) => {
//   const { name } = props;
//   const TheDoc = name;
//   return <TheDoc {...props} />;
// };

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = dynamic(() => import(`./ArticleLayouts/${layout}`));
    return <Layout {...rest} />;
  },
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: any) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
