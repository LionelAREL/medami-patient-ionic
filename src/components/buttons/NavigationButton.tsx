import { constant } from "../../styles/constants"

type NavigationButtonProps = {
    variant?:'next' | 'previous';
    isFull: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NavigationButton = ({variant = 'next', isFull, disabled = false, onClick}:NavigationButtonProps) => {

  const commonProps: React.HTMLAttributes<HTMLDivElement> = {
    onClick: disabled ? undefined : onClick,
    style: {
      cursor: disabled ? "default" : "pointer", 
      color: variant === 'next' ? constant.white : constant.primaryColor, 
      backgroundColor: variant === "next" ? constant.primaryColor : constant.background, border: `${constant.primaryColor} 1px solid`,
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1
    }
  }

    if(isFull) {
        return (
          <div {...commonProps} style={{ flex: 1, height: "60px", fontSize: "24px", fontStyle: "normal",textAlign: "center", fontWeight: 200, borderRadius: 0, ...commonProps.style}}>
            {variant === 'next' ? 'Suivant' : 'Retour'}
          </div>
        )
    }

  return (
    <div {...commonProps} style={{ width: '200px', height:"48px", fontSize: "24px", fontStyle: "normal",textAlign: "center", fontWeight: 200, borderRadius: "8px", ...commonProps.style}}>
      {variant === 'next' ? 'Suivant' : 'Retour'}
    </div>
  )
}

export default NavigationButton