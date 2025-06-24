import { constant } from "../../styles/constants";

type NavigationButtonProps = React.PropsWithChildren<{
  variant?: "primary" | "secondary";
  isFull: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}>;

const NavigationButton = ({
  variant = "primary",
  isFull,
  disabled = false,
  onClick,
  children,
}: NavigationButtonProps) => {
  const commonProps: React.HTMLAttributes<HTMLDivElement> = {
    onClick: disabled ? undefined : onClick,
    style: {
      cursor: disabled ? "default" : "pointer",
      color: variant === "secondary" ? constant.primaryColor : constant.white,
      backgroundColor:
        variant === "secondary" ? constant.background : constant.primaryColor,
      border: `${constant.primaryColor} 1px solid`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
    },
  };

  if (isFull) {
    return (
      <div
        {...commonProps}
        style={{
          flex: 1,
          height: "60px",
          fontSize: "24px",
          fontStyle: "normal",
          textAlign: "center",
          fontWeight: 200,
          borderRadius: 0,
          ...commonProps.style,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      {...commonProps}
      style={{
        width: "200px",
        height: "48px",
        fontSize: "24px",
        fontStyle: "normal",
        textAlign: "center",
        fontWeight: 200,
        borderRadius: "8px",
        ...commonProps.style,
      }}
    >
      {children}
    </div>
  );
};

export default NavigationButton;
