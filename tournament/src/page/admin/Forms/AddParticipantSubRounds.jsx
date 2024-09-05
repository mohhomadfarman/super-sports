import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
function AddParticipantSubRounds() {

    const animatedComponents = makeAnimated();
    const colourOptions =[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
  return (
    <div className='row'>
        <div className="col-md-12">
            <div className='mb-3'>
                <div className='from-lable'>
                    Select Participant
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[colourOptions[4], colourOptions[5]]}
                        isMulti
                        options={colourOptions}
                        />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddParticipantSubRounds