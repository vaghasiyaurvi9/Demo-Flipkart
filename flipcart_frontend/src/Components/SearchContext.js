import React, { useState } from 'react'
import Index from './Index';
import NavBar from './NavBar';
import { searchContexData } from './Contex';

const SearchContext = () => {
    const [Data, setData] = useState('');    
    return (
        <div>
            <searchContexData.Provider value={{ Data, setData }}>
                <NavBar />
                <Index />
            </searchContexData.Provider>

        </div>
    )
}

export default SearchContext
