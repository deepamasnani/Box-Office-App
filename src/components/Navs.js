import React from 'react'
import { Link } from 'react-router-dom';

const Links = [
    {
        to: '/',
        message: "home"
    },
    {
        to: '/starred',
        message: 'starred'
    }
]

const Navs = () => {
    return (
        <div>
           <ul>
               {
                Links.map(item=>{
                    return <li key={item.to}><Link to={item.to}>{item.message}</Link></li>
                })
               }
           </ul>
        </div>
    )
}

export default Navs;
