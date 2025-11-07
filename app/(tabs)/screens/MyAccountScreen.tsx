// MyAccount.tsx
import React, { useState } from 'react';

const MyAccount: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Yosiris',
    email: 'Yosirissantos20@gmail.com',
    notifications: true,
    location: 'All of USA',
    country: 'United States',
    locationBasedContent: true
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(userInfo.email);

  const countries = [
    'United States',
    'United Kingdom',
    'Germany',
    'Australia',
    'France',
    'Canada',
    'Japan',
    'Brazil',
    'Spain',
    'Italy'
  ];

  const locations = [
    'All of USA',
    'New York',
    'California',
    'Texas',
    'Florida',
    'Illinois',
    'All of UK',
    'London',
    'Manchester',
    'All of Germany',
    'Berlin',
    'Munich'
  ];

  const handleEmailEdit = () => {
    setIsEditingEmail(true);
    setTempEmail(userInfo.email);
  };

  const handleEmailSave = () => {
    if (tempEmail.trim() && isValidEmail(tempEmail)) {
      setUserInfo(prev => ({ ...prev, email: tempEmail.trim() }));
      setIsEditingEmail(false);
    } else {
      alert('Please enter a valid email address');
    }
  };

  const handleEmailCancel = () => {
    setTempEmail(userInfo.email);
    setIsEditingEmail(false);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: string, value: any) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="account-container">
      {/* Header */}
      <header className="account-header">
        <h1 className="page-title">My Account</h1>
      </header>

      {/* User Info Section */}
      <section className="user-info-section">
        <div className="user-avatar">
          <div className="avatar-placeholder">
            {userInfo.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="user-details">
          <div className="user-name">{userInfo.name}</div>
          <div className="user-email">
            {isEditingEmail ? (
              <div className="email-edit-container">
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="email-input"
                  placeholder="Enter your email"
                />
                <div className="email-actions">
                  <button onClick={handleEmailSave} className="save-button">
                    ✓
                  </button>
                  <button onClick={handleEmailCancel} className="cancel-button">
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="email-display">
                <span>{userInfo.email}</span>
                <button onClick={handleEmailEdit} className="edit-button">
                  ✎
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="settings-section">
        <h2 className="section-title">Notifications</h2>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">My Notifications</div>
            <div className="setting-description">Receive Notifications?</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={userInfo.notifications}
              onChange={(e) => handleInputChange('notifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      {/* Location Settings Section */}
      <section className="settings-section">
        <h2 className="section-title">Location Settings</h2>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">My Location</div>
          </div>
          <select
            value={userInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="location-select"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">My Country</div>
          </div>
          <select
            value={userInfo.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="country-select"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">Location Based Content</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={userInfo.locationBasedContent}
              onChange={(e) => handleInputChange('locationBasedContent', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="preferences-section">
        <h2 className="section-title">Preferences</h2>
        
        <div className="preference-item">
          <span className="preference-label">My Favorites</span>
          <span className="preference-arrow">›</span>
        </div>
        
        <div className="preference-item">
          <span className="preference-label">Saved Payment Methods</span>
          <span className="preference-arrow">›</span>
        </div>
        
        <div className="preference-item">
          <span className="preference-label">Change App Icon</span>
          <span className="preference-arrow">›</span>
        </div>
        
        <div className="preference-item">
          <span className="preference-label">Help & Guidance</span>
          <span className="preference-arrow">›</span>
        </div>
      </section>

      <style jsx>{`
        .account-container {
          max-width: 400px;
          margin: 0 auto;
          background: white;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding-bottom: 80px; /* Space for bottom navigation */
        }

        .account-header {
          padding: 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .page-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #000;
        }

        .user-info-section {
          padding: 20px 16px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 60px;
          height: 60px;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 30px;
          background: #007bff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 600;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-size: 20px;
          font-weight: 600;
          color: #000;
          margin-bottom: 4px;
        }

        .user-email {
          font-size: 16px;
          color: #666;
        }

        .email-display {
          display: flex;
          align-items: center;
          justify-content: between;
          gap: 8px;
        }

        .edit-button {
          background: none;
          border: none;
          color: #007bff;
          font-size: 16px;
          cursor: pointer;
          padding: 4px;
        }

        .email-edit-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .email-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .email-actions {
          display: flex;
          gap: 4px;
        }

        .save-button, .cancel-button {
          background: none;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .save-button {
          background: #28a745;
          color: white;
        }

        .cancel-button {
          background: #dc3545;
          color: white;
        }

        .settings-section {
          padding: 20px 16px;
          border-bottom: 1px solid #e5e5e5;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #000;
        }

        .setting-item {
          display: flex;
          justify-content: between;
          align-items: center;
          padding: 12px 0;
        }

        .setting-info {
          flex: 1;
        }

        .setting-label {
          font-size: 16px;
          font-weight: 500;
          color: #000;
          margin-bottom: 2px;
        }

        .setting-description {
          font-size: 14px;
          color: #666;
        }

        .location-select, .country-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          min-width: 150px;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #007bff;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        .preferences-section {
          padding: 20px 16px;
        }

        .preference-item {
          display: flex;
          justify-content: between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
        }

        .preference-item:last-child {
          border-bottom: none;
        }

        .preference-label {
          font-size: 16px;
          color: #000;
        }

        .preference-arrow {
          font-size: 18px;
          color: #666;
        }

        .preference-item:hover {
          background: #f9f9f9;
          margin: 0 -16px;
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

export default MyAccount;