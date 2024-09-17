import React from 'react'
import { AppURL } from '../assets/config'

function Loader() {
  return (
    <div className='d-flex loader align-items-center justify-content-center'>
            <img width={200} height={200} src={`${AppURL}/images/load.gif`} alt='loaderImage'/>
      
    </div>
  )
}

export default Loader