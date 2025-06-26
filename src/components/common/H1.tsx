import { constant } from "../../styles/constants";

type H1Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

const H1 = ({ children, ...props }: H1Props) => {
  return (
    <h1
      style={{
        color: constant.textInputStyle.color,
        fontWeight: 400,
        fontSize: 35,
        padding: 0,
        margin: 0,
        ...props.style,
      }}
    >
      {children}
    </h1>
  );
};

export default H1;
