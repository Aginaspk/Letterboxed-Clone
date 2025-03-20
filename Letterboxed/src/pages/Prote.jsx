import React, { useEffect, useState } from 'react'
import api from '../api/api';

function Prote() {
    const [mess, setMess] = useState({});
    useEffect(() => {
        const au = async () => {
            try {
                const res = await api.get('/authUser/protect');
                alert(res.data.messgae)
                console.log(res.data.messgae)
                
            } catch (error) {
                alert(error)
            }
        }
        au();
    }, [])
    return (
        <div>
            hello
        </div>
    )
}

export default Prote