import Link from "next/link";

const ImageGallery = ({ image, title }) => {
  return (
    <Link href={image} className="contents" target="_blank">
      <img
        src={image}
        className="max-w-full lg:h-[600px] md:h-[300px] !my-0 object-cover mx-auto shadow-lg"
        alt={`${title} image`}
      />
    </Link>
  );
};

export default ImageGallery;
