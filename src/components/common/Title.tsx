import { constant } from "../../styles/constants";

type H1Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  type?: "h1" | "h2" | "h4";
};

const Title = ({ children, type = "h1", ...props }: H1Props) => {
  let style = {};

  switch (type) {
    case "h1":
      style = {
        color: constant.primaryColor,
        fontWeight: 700,
        fontSize: 36,
      };
      break;
    case "h2":
      style = {
        color: constant.primaryColor,
        fontWeight: 400,
        fontSize: 32,
      };
      break;
    case "h4":
      style = {
        color: constant.primaryColor,
        fontWeight: 600,
        fontSize: 16,
      };
      break;
  }
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        ...style,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default Title;
