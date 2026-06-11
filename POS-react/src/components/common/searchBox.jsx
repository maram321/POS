import React from 'react';
import { IoSearch } from "react-icons/io5";
import "./searchBox.css"


const SearchBox = ({value, onChange}) => {
    return (
        <div className="search-container">
            <input type="text" name='query' className="search-box my-3" aria-describedby="basic-addon1" value={value} onChange={e => onChange(e.currentTarget.value)}/>
            <span className="icon" ><IoSearch /></span>
        </div>
    )
}

export default SearchBox;