/* eslint-disable */
import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
const [input, setInput] = useState('');
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
            <input type="text" onChange = {onInputChange} onKeyDown={onKeyDown} value={input} placeholder="Search Please" />
            <div>
                <label htmlFor = "shows-search">
                    Shows
                    <input id="shows-search" type="radio" value="shows" onChange = {onRadioChange} checked={isShowsSearch} />
                </label>
                <label htmlFor = "actors-search">
                    Actors
                    <input id="actors-search"type="radio" value="people" onChange = {onRadioChange} checked={!isShowsSearch} />
                </label>
            </div>
            <button type="button" onClick = {onSearch}>Search</button>
            {renderResults()} 
        </MainPageLayout>
    )
}

export default Home
