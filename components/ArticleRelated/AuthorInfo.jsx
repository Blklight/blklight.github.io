import Image from "next/image";

// interface AuthorProp {
//   author: object;
//   quote: string;
// }

const AuthorInfo = ({ author, quote }) => {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
  } = author;
  return (
    <>
      <div className="flex md:flex-row flex-col items-center lg:px-4 px-2 mb-6">
        <img
          src={avatar}
          className={`w-36 h-36 rounded-full object-cover hover:scale-105 hover:ring-2 ring-gray-300 hover:shadow-lg transition-all md:mb-0 mb-4 `}
          alt={`${name} Image`}
        />
        {/* <Image
          src={avatar}
          className={`w-36 h-36 rounded-full object-cover hover:ring-2 ring-gray-300 hover:shadow-lg transition-all`}
          width={10000}
          height={10000}
          alt={`${name} Image`}
        /> */}

        <div className="flex flex-col flex-1 justify-center ml-6">
          <h4 className="text-2xl font-bold tracking-wider mb-2">
            <span className="marker-line rounded-md bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 !py-1 !px-2">
              {name}
            </span>
          </h4>

          {quote && (
            <>
              <p className="text-xl font-medium leading-normal">
                <span className="marker-line rounded-md bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 !py-1 !px-2">
                  "{quote}"
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthorInfo;
