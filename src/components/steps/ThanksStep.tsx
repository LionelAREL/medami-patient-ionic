import React from 'react'
import { constant } from '../../styles/constants'
import H1 from '../common/H1'

const ThanksStep = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...constant.textInputStyle}}>
      <H1 style={{ alignSelf: 'center', marginBottom: 20}}>Merci !</H1>
      <div>Le questionnaire prendra fin automatiquement dans quelques secondes</div>
    </div>
  )
}

export default ThanksStep
