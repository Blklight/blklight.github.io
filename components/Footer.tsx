import Link from "next/link";
const Footer = () => {
  return (
    <>
      <footer className="max-w-full pt-4 px-6 pb-12">
        <div className="container mx-auto">
          <img
            src="/blklight-white.svg"
            className="mx-auto hidden dark:block"
            width="50"
            height="50"
            alt="Ultimate Mercer Logo"
          />

          <img
            src="/blklight-black.svg"
            className="mx-auto block dark:hidden"
            width="50"
            height="50"
            alt="Ultimate Mercer Logo"
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
