import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import Loading from './Loading'

function BpListing() {
  const { bp } = useSelector((state) => state.slices)

  if (!bp || !bp.content) {
    return <div className="text-center"><Loading /></div>;
  }

  return (
    <div>
      {bp.content && bp.content.map((bp) => (
        <Card key={bp.id} bp={bp} />
      ))}
    </div>
  )
}

export default BpListing