import { AnimatePresence, motion } from "motion/react";
import { useQuestionnaireStore } from "../store";
import { useKeyboardHeight } from "../utils/hooks/useKeyboardHeight";

const Question = () => {
  const { currStep, currSubStep, child, transitionDirection } =
    useQuestionnaireStore();

  const keyboardHeight = useKeyboardHeight();

  if (!child && !currStep) return null;

  const variants = {
    initial: (dir: "forward" | "backward") =>
      dir === "forward"
        ? { x: "150vw", y: "-50%" }
        : { x: "-150vw", y: "-50%" },
    animate: { x: "-50%", y: "-50%" },
    exit: (dir: "forward" | "backward") =>
      dir === "forward"
        ? { x: "-150vw", y: "-50%" }
        : { x: "150vw", y: "-50%" },
  };

  return (
    <AnimatePresence
      initial={false}
      presenceAffectsLayout={false}
      custom={transitionDirection}
    >
      <motion.div
        key={`${currStep!.id}-${currSubStep}`}
        custom={transitionDirection}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: `calc(50% - ${keyboardHeight / 2}px)`,
          left: "50%",
          padding: 20,
        }}
      >
        {child}
      </motion.div>
    </AnimatePresence>
  );
};

export default Question;
