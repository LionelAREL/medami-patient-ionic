import { AnimatePresence, motion } from 'motion/react';
import { useQuestionnaireStore } from '../store';
const Question = () => {
  const { currStep, currSubStep, child, transitionDirection } = useQuestionnaireStore();

  if(!child && !currStep) {
    return null
  }

  return (
        <AnimatePresence initial={false}>
          <motion.div
            key={`${currStep?.id}-${currSubStep}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              padding: 20,
            }}
            initial={transitionDirection === "forward" ? { x: '100vw',  y: '-50%' } : { x: '-100vw',  y: '-50%' }}
            animate={{ x: '-50%', y: '-50%' }}
            exit={transitionDirection === "forward" ? { x: '-100vw', y: '-50%' } : { x: '100vw', y: '-50%' }}
            transition={{ duration: 0.6 }}
          >
            {child}
          </motion.div>
      </AnimatePresence>
  )
}

export default Question
