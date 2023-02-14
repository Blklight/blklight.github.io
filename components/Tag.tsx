import Link from "next/link";
import kebabCase from "@/lib/utils/kebabCase";

interface TagProp {
  text: string;
}

const Tag = ({ text }: TagProp) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(" ").join("-")}
      </span>
    </Link>
  );
};

export default Tag;
