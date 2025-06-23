import React from 'react'
import NavigationButton from './buttons/NavigationButton'
import { Display, useFitsIn } from '../utils/hooks/useFitsIn'
import { useQuestionnaireStore } from '../store'

const Footer = () => {
const isFull = useFitsIn(Display.TABLET)
const {currStep, advance, back} = useQuestionnaireStore()
const canAdvance = useQuestionnaireStore(s => s.canAdvance());

  if(currStep?.__typename === "NotFoundStep") {
    return null
  }


  if(currStep?.__typename === "ThanksStep") {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", position: "absolute", bottom: "0", left:0, right:0, paddingBottom: isFull ? 0 : "60px"}}>
        <NavigationButton variant='primary' isFull={isFull} onClick={() => advance()}>
          Terminer
        </NavigationButton>
      </div>
    )
  }


  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: "0", left:0, right:0, paddingBottom: isFull ? 0 : "60px"}}>
      <NavigationButton variant='secondary' isFull={isFull} onClick={() => back()}>Retour</NavigationButton>
      <NavigationButton isFull={isFull} disabled={!canAdvance} onClick={() => advance()}>Suivant</NavigationButton>
    </div>
  )
}

export default Footer
