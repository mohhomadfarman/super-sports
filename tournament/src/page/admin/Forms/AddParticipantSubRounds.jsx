import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { GetContests, GetSingleContests } from '../../../redux/contestSlice';
import { getUserId } from '../../../utils_sec/auth';
import { useParams } from 'react-router-dom';


function AddParticipantSubRounds() {
    const { id } = useParams();
    const userid = useMemo(() => getUserId()?.id, []);

    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    useEffect(()=>{
        dispatch(GetSingleContests(id)).then((res) => {
            setData(res.payload);
          });
        }, [id, dispatch]);


    const animatedComponents = makeAnimated();
    const colourOptions =[ ]

    data?.participants?.map(item => {
      const firstName = item?.firstName.charAt(0).toUpperCase() + item?.firstName.slice(1).toLowerCase();
      const lastName = item?.lastName.charAt(0).toUpperCase() + item?.lastName.slice(1).toLowerCase();
  
      colourOptions.push({
          value: item?._id,
          label: firstName + " " + lastName
      });
  });
  
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