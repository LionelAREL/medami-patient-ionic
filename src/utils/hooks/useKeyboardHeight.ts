import { Keyboard } from "@capacitor/keyboard";
import { isPlatform } from "@ionic/react";
import { useEffect, useState } from "react";

export const useKeyboardHeight = (): number => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!isPlatform("android")) {
      setKeyboardHeight(0);
      return;
    }
    const showListener = Keyboard.addListener("keyboardWillShow", (info) => {
      setKeyboardHeight(info.keyboardHeight);
    });

    const hideListener = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  return keyboardHeight;
};
