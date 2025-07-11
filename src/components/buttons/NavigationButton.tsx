import { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { constant } from "../../styles/constants";

type NavigationButtonProps = React.PropsWithChildren<{
  variant?: "primary" | "secondary";
  isFull?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}> &
  React.HTMLAttributes<HTMLDivElement>;

const NavigationButton = ({
  variant = "primary",
  isFull = false,
  disabled = false,
  onClick,
  children,
  ...props
}: NavigationButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const commonProps = {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    style: {
      cursor: disabled ? "default" : "pointer",
      color: variant === "secondary" ? constant.primaryColor : constant.white,
      backgroundColor:
        variant === "secondary" ? constant.background : constant.primaryColor,
      border: `${constant.primaryColor} 1px solid`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : isHovered ? 0.8 : 1,
      fontWeight: 400,
      ...(isFull ? { flex: 1, height: "60px" } : {}),
    },
    initial: { y: 50 },
    animate: { y: 0 },
    exit: { y: 50 },
    transition: { duration: 0.3, easeInOut: "linear" },
  };

  const sharedStyle = {
    fontSize: "24px",
    fontStyle: "normal",
    ...commonProps.style,
    ...props.style,
  };

  return (
    <motion.div
      {...commonProps}
      style={{
        width: !isFull ? "200px" : undefined,
        height: "48px",
        borderRadius: isFull ? 0 : 8,
        ...sharedStyle,
      }}
    >
      {children}
    </motion.div>
  );
};

export default NavigationButton;
