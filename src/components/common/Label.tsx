import { constant } from "../../styles/constants";

type LabelProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLLabelElement>
>;

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      style={{
        ...constant.textInputStyle,
        fontWeight: 600,
        fontSize: 14,
        ...props.style,
      }}
    >
      {children}
    </label>
  );
};

export default Label;
