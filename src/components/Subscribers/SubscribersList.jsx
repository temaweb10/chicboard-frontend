import React , {useState} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
function SubscribersList({idArray}) {

    const [loading,setLoading] = useState(false)
    const [subs,setSubs] = useState('')

    const getAllSub = async ()=>{
        let q = await axios.all(idArray.map((id)=>{
            return axios.get(`/api/user/findByIdForSub/${id}`)
        }))
        setSubs(q)
        setLoading(true)
    }
    console.log('333gsgs')

    if(idArray.length !== 0){
        getAllSub()
    }

  return (
    <div>{loading == true ?  (
        <div>

        {1 == 1 ? console.log('rr') : ''}

    </div>
    ) : <Loader stylesProps={{ minHeight:'150px'}}/>}</div>
  )
}

export default SubscribersList