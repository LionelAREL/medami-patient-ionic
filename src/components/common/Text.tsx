import { constant } from "../../styles/constants";

type TextStyleProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

const TextStyle = ({ children, ...props }: TextStyleProps) => {
  return (
    <div
      {...props}
      style={{
        ...constant.textInputStyle,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default TextStyle;
