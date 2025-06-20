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


  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: "0", left:0, right:0, paddingBottom: isFull ? 0 : "60px"}}>
      <NavigationButton variant='previous' isFull={isFull} onClick={() => back()}/>
      <NavigationButton isFull={isFull} disabled={!canAdvance} onClick={() => advance()}/>
    </div>
  )
}

export default Footer
