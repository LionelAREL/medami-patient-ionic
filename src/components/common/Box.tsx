import React from "react";
import { constant } from "../../styles/constants";

type BoxProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

const Box = ({ children, ...divProps }: BoxProps) => {
  return (
    <div
      {...divProps}
      style={{
        borderRadius: constant.boxRadius,
        boxShadow: constant.defaultShadow.css,
        padding: constant.paddingMedium,
        backgroundColor: constant.white,
        ...divProps.style,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
