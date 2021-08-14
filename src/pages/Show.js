/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useParams } from 'react-router-dom'
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';




const Show = () => {
    const {id} = useParams();

    // const[show, setShow] = useState(null);
    // const[isLoading, setisLoading] = useState(true);
    // const[error, setError] = useState(null);

    const{show, isLoading, error} = useShow(id);
    
    console.log(show);
    if(isLoading){
        return <div>Data is being loaded</div>
    }
    if(error){
        return <div>Error occured {error}</div>
    }
    return (
        
        <ShowPageWrapper>
            
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />

            <InfoBlock>Details</InfoBlock>
            <Details status = {show.status} network={show.network} premiered={show.premiered} />

            <InfoBlock>Seasons</InfoBlock>
            <Seasons seasons={show._embedded.seasons} />

            <InfoBlock>Cast</InfoBlock>
            <Cast cast={show._embedded.cast} />
        </ShowPageWrapper>
    )
}

export default Show
