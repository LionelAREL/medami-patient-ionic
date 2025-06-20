import React from 'react'
import Box from '../common/Box'

type DoctorSelectorProps = {
    doctors: unknown;
}

const DoctorSelector = ({doctors}: DoctorSelectorProps) => {
  return (
    <Box>
        {JSON.stringify(doctors)}
    </Box>
  )
}

export default DoctorSelector
