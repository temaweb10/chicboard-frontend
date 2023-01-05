import React , {useState,useEffect} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Avatar from '../Avatar/Avatar'
import styles from './Subscribers.module.scss'
import {Link} from 'react-router-dom'
import Rating from "@mui/material/Rating";
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

    useEffect(()=>{
        if(idArray.length !== 0){
          getAllSub()
      }
    },[])

  return (
    <div>{loading == true ?  (

        <div>
            {subs.map((user)=>{
                console.log(user.data)
                return <div key={`${Date.now()}_sub${Math.random(10)}`}>
                    <div className={styles["user-block"]}>

                        <div className={styles["user-block-left"]}>
                            <Avatar user={user.data} className={styles['user-avatar']}/> 
                        </div>

                        <div style={{display:'flex',flexDirection:'column'}}>
                            <a href={`/user/${user.data.id}`} className={styles["user-name"]} >{`${user.data.name} ${user.data.surname}`}</a>
                            <Rating name="read-only" value={user.data.rating} readOnly />
                        </div>
                        
                    </div>
                </div>
            })}
        </div>

    ) : <Loader stylesProps={{ minHeight:'150px'}}/>}
    
    </div>
  )
}

export default SubscribersList