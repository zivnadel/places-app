import { twMerge } from "tailwind-merge";

interface Props {
  image: string;
  alt: string;
  className?: string;
  imageDimensions?: string;
}

const Avatar: React.FC<Props> = ({
  className,
  image,
  alt,
  imageDimensions,
}) => {
  return (
    <div
      className={twMerge(
        `w-full h-full flex justify-center items-center ${className}`
      )}
    >
      <img
        src={image}
        alt={alt}
        className={twMerge(
          `w-full h-full rounded-full block ${imageDimensions}`
        )}
      />
    </div>
  );
};

export default Avatar;
