import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import { BloodPressureChart } from './BpChart'

function BpListing() {
  const { bp } = useSelector((state) => state.slices)
  return (
    <div>
      {bp.bps && bp.bps.map((bp) => (
          <Card key={bp.id} bp={bp} />
      ))}
    </div>
  )
}

export default BpListing