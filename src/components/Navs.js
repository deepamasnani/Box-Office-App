import React from 'react'
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';

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
    const location = useLocation();
    
    return (
        <div>
           <NavList>
               {
                Links.map(item=>{
                    return <li key={item.to} ><LinkStyled to={item.to} className={item.to === location.pathname ? 'active' : ''}>{item.message}</LinkStyled></li>
                })
               }
           </NavList>
        </div>
    )
}

export default Navs;
