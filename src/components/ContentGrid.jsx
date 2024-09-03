import React from 'react';
import './ContentGrid.css';

const ContentGrid = ({ data }) => {
    return (
        <div className="content-grid">
            {data.map((item, index) => (
                <div className="content-item" key={index}>
                    <img
                        src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
                        alt={item.name}
                        onError={(e) => { e.target.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png'; }}
                    />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ContentGrid;

