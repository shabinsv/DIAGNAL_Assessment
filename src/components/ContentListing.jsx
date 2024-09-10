import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentGrid from './ContentGrid';
import './ContentListing.css';

const BASE_API_URL = 'https://test.create.diagnal.com';

const ContentListing = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/data/page${page}.json`);
                setData(prevData => [...prevData, ...response.data.page['content-items'].content]);
                setTitle(response.data.page.title)
            } catch (error) {
                console.log("Axios Error");
            }
        };
        fetchData();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="content-listing">
            <header className="header">
                <button className="icon-button" onClick={() => {

                    if (searchMode) {
                        setSearchMode(false);
                        setSearchQuery("");
                    } else {
                        window.history.back();
                    }
                }}>
                    <img src={`${BASE_API_URL}/images/Back.png`} alt="Back" />
                </button>
                {!searchMode && <h1 className="title">{title}</h1>}
                {searchMode ? (
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                ) : (
                    <button className="icon-button" onClick={() => setSearchMode(true)}>
                        <img src={`${BASE_API_URL}/images/search.png`} alt="Search" />
                    </button>
                )}
            </header>
            <ContentGrid data={filteredData} />
        </div>
    );
};

export default ContentListing;
