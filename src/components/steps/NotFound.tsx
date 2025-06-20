import React from 'react'
import Box from '../common/Box'
import ResponsiveImage from '../common/ResponsiveImage'
import NotFoundImage from "./../../assets/images/404.svg"
import useStepImageWidth from '../../utils/hooks/useStepImageWidth'

const NotFound = () => {
  const width = useStepImageWidth()
  return (
    <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
      <ResponsiveImage src={NotFoundImage} width={width } />
      <Box style={{width: "90vw", maxWidth: "400px"}}>
        Le questionnaire de santé auquel vous tentez d'accéder est <strong>introuvable</strong>
        <br/>
        <br/>
        Veuillez en faire part à votre professionnel de santé.
      </Box>
    </div>
  )
}

export default NotFound
