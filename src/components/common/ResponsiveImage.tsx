import React from "react";

type ResponsiveImageProps = React.ComponentProps<"img"> & {
  baseName?: string;
  extension?: string;
};

const ResponsiveImage = ({
  baseName,
  extension = "png",
  ...props
}: ResponsiveImageProps) => {
  return (
    <img
      style={{ objectFit: "contain", ...props.style }}
      src={baseName ? `/images/${baseName}@1x.${extension}` : undefined}
      srcSet={
        baseName
          ? `
        /images/${baseName}@1x.${extension} 1x,
        /images/${baseName}@2x.${extension} 2x,
        /images/${baseName}@3x.${extension} 3x
      `
          : undefined
      }
      {...props}
    />
  );
};

export default ResponsiveImage;
