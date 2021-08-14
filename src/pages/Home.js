/* eslint-disable */
import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from '../components/Home.styled';
import MainPageLayout from '../components/MainPageLayout';
import CustomRadio from '../components/shows/CustomRadio';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
const [input, setInput] = useLastQuery();
const [results, setResults] = useState(null);   
const [searchOptions, setSearchOptions] = useState('shows');
const isShowsSearch = searchOptions === 'shows';


const onSearch = () => {
    apiGet(`/search/${searchOptions}?q=${input}`).then(result => {
        setResults(result);
    })
}

const onInputChange = (ev) => {
    setInput(ev.target.value);
}
const onKeyDown = (ev) =>{
    if(ev.keyCode === 13){
        onSearch();
    }
}
const renderResults = () => {

    if(results && results.length === 0){
        return(
            <div>
                No Results
            </div>
        )
    }
    if(results && results.length > 0){
        return results[0].show ? 
        <ShowGrid data={results} /> : <ActorGrid data={results} />
    }
    return null;
}
const onRadioChange = (ev) =>{
    setSearchOptions(ev.target.value);
}
    return (
        <MainPageLayout>
            <SearchInput type="text" onChange = {onInputChange} onKeyDown={onKeyDown} value={input} placeholder="Search Please" />
            <RadioInputsWrapper>
                <div>

                 <CustomRadio 
                 label= "Shows"
                 id="shows-search" 
                 type="radio"
                 value="shows" 
                 onChange = {onRadioChange} 
                 checked={isShowsSearch}
                 />

                </div>
                <div>
                <CustomRadio 
                 label= "Actors"
                 id="actors-search" 
                 type="radio"
                 value="people" 
                 onChange = {onRadioChange} 
                 checked={!isShowsSearch}
                 />
                
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type="button" onClick = {onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults()} 
        </MainPageLayout>
    )
}

export default Home
