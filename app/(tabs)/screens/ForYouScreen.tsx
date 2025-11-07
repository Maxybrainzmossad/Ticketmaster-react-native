// favorite.tsx
import React, { useState } from 'react';

const Favorite: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const favorites = [
    { 
      name: 'PINK', 
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face',
      type: 'Performer'
    },
    { 
      name: 'Phoenix Suns', 
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      type: 'NBA Team'
    },
    { 
      name: 'Eagles', 
      image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Orlando City SC', 
      image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=100&h=100&fit=crop',
      type: 'MLS Team'
    },
    { 
      name: 'Kansas City Chiefs', 
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Las Vegas Raiders', 
      image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Pittsburgh Steelers', 
      image: 'https://images.unsplash.com/photo-1574629173115-01ba0d1c41f1?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Green Bay Packers', 
      image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Buffalo Bills', 
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Philadelphia Eagles', 
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'San Francisco 49ers', 
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Minnesota Vikings', 
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Atlanta Falcons', 
      image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Denver Broncos', 
      image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Cincinnati Bengals', 
      image: 'https://images.unsplash.com/photo-1471295256113-c89354c96b49?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Carolina Panthers', 
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Los Angeles Chargers', 
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop',
      type: 'NFL Team'
    },
    { 
      name: 'Miami Dolphins', 
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
      type: 'NFL Team'
    }
  ];

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="favorite-page">
      {/* Header */}
      <header className="favorites-header">
        <h1 className="page-title">Add Favorites</h1>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Q. Search performers, teams, or venues"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Favorites List */}
      <section className="favorites-list-section">
        <ul className="favorites-list">
          {filteredFavorites.map((item, index) => (
            <li key={index} className="favorite-item">
              <div className="favorite-image-container">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="favorite-image"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop';
                  }}
                />
              </div>
              <div className="favorite-content">
                <div className="favorite-name">{item.name}</div>
                <div className="favorite-type">{item.type}</div>
              </div>
              <button className="favorite-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#E5E5E5"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .favorite-page {
          max-width: 375px;
          margin: 0 auto;
          background: white;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .favorites-header {
          padding: 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #000;
        }

        .search-section {
          padding: 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .search-container {
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          background: #f5f5f5;
        }

        .search-input::placeholder {
          color: #666;
        }

        .favorites-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .favorite-item {
          padding: 12px 16px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .favorite-item:hover {
          background: #f9f9f9;
        }

        .favorite-image-container {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .favorite-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .favorite-content {
          flex: 1;
        }

        .favorite-name {
          font-size: 16px;
          font-weight: 500;
          color: #000;
          margin-bottom: 4px;
        }

        .favorite-type {
          font-size: 14px;
          color: #666;
        }

        .favorite-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .favorite-button:hover {
          background: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Favorite;