import { Display, useFitsIn } from "./useFitsIn";

const useStepImageWidth = () => {
  const isTinyMobile = useFitsIn(Display.TINY_MOBILE);
  const isMobile = useFitsIn(Display.MOBILE);
  return isTinyMobile ? 180 : isMobile ? 250 : undefined;
};

export default useStepImageWidth;
