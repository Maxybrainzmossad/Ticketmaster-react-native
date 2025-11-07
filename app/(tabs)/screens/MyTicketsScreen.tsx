// DynamicTicketMaster.tsx
import React, { useState } from 'react';

interface Ticket {
  id: string;
  eventName: string;
  artistName: string;
  date: string;
  time: string;
  venue: string;
  gate: string;
  section: string;
  row: string;
  seat: string;
  ticketType: string;
  deliveryMethod: string;
  qrCode: string;
  eventImage: string;
}

const DynamicTicketMaster: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'qr'>('list');

  const [formData, setFormData] = useState({
    eventName: '',
    artistName: '',
    date: '',
    time: '',
    venue: '',
    gate: '',
    section: '',
    row: '',
    seat: '',
    ticketType: '',
    deliveryMethod: '',
    eventImage: ''
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateQRCode = (text: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          eventImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTicket = () => {
    if (!formData.eventName || !formData.artistName || !formData.venue) {
      alert('Please fill in Event Name, Artist Name, and Venue');
      return;
    }

    const newTicket: Ticket = {
      id: Date.now().toString(),
      eventName: formData.eventName,
      artistName: formData.artistName,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      gate: formData.gate,
      section: formData.section,
      row: formData.row,
      seat: formData.seat,
      ticketType: formData.ticketType || 'General Admission',
      deliveryMethod: formData.deliveryMethod || 'Mobile Entry',
      qrCode: generateQRCode(`${formData.artistName}-${formData.eventName}-${formData.section}-${formData.row}-${formData.seat}`),
      eventImage: formData.eventImage
    };

    setTickets(prev => [...prev, newTicket]);
    setShowForm(false);
    setCurrentTicketIndex(tickets.length);
    
    // Reset form
    setFormData({
      eventName: '',
      artistName: '',
      date: '',
      time: '',
      venue: '',
      gate: '',
      section: '',
      row: '',
      seat: '',
      ticketType: '',
      deliveryMethod: '',
      eventImage: ''
    });
  };

  const handleNextTicket = () => {
    if (currentTicketIndex < tickets.length - 1) {
      setCurrentTicketIndex(currentTicketIndex + 1);
    }
  };

  const handlePrevTicket = () => {
    if (currentTicketIndex > 0) {
      setCurrentTicketIndex(currentTicketIndex - 1);
    }
  };

  const handleViewTicket = () => {
    setViewMode('detail');
  };

  const handleViewQR = () => {
    setViewMode('qr');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  const handleAddNewTicket = () => {
    setShowForm(true);
  };

  const currentTicket = tickets[currentTicketIndex];

  // Form View
  if (showForm) {
    return (
      <div className="container">
        <div className="header">
          <h1>Create New Ticket</h1>
        </div>

        <div className="scrollable-content">
          <div className="form">
            <div className="form-group">
              <label>Artist Name *</label>
              <input
                type="text"
                value={formData.artistName}
                onChange={(e) => handleInputChange('artistName', e.target.value)}
                placeholder="e.g., The Weeknd"
              />
            </div>

            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => handleInputChange('eventName', e.target.value)}
                placeholder="e.g., After Hours Til Dawn Tour"
              />
            </div>

            <div className="form-group">
              <label>Venue *</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                placeholder="e.g., Rogers Centre"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  placeholder="e.g., Mon, Jul 28, 2025"
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  placeholder="e.g., 7:00 PM"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gate</label>
                <input
                  type="text"
                  value={formData.gate}
                  onChange={(e) => handleInputChange('gate', e.target.value)}
                  placeholder="e.g., 5"
                />
              </div>
              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => handleInputChange('section', e.target.value)}
                  placeholder="e.g., A12"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Row</label>
                <input
                  type="text"
                  value={formData.row}
                  onChange={(e) => handleInputChange('row', e.target.value)}
                  placeholder="e.g., 15"
                />
              </div>
              <div className="form-group">
                <label>Seat</label>
                <input
                  type="text"
                  value={formData.seat}
                  onChange={(e) => handleInputChange('seat', e.target.value)}
                  placeholder="e.g., 8"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ticket Type</label>
              <input
                type="text"
                value={formData.ticketType}
                onChange={(e) => handleInputChange('ticketType', e.target.value)}
                placeholder="e.g., VIP Package"
              />
            </div>

            <div className="form-group">
              <label>Delivery Method</label>
              <input
                type="text"
                value={formData.deliveryMethod}
                onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                placeholder="e.g., Mobile Entry"
              />
            </div>

            <div className="form-group">
              <label>Event Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {formData.eventImage && (
                <img src={formData.eventImage} alt="Preview" className="image-preview" />
              )}
            </div>

            <button onClick={handleAddTicket} className="add-button">
              Add Ticket
            </button>

            {tickets.length > 0 && (
              <button onClick={() => setShowForm(false)} className="view-tickets-button">
                View My Tickets ({tickets.length})
              </button>
            )}

            {/* Spacer to ensure button is reachable */}
            <div className="form-spacer"></div>
          </div>
        </div>

        <style >{`
          .container {
            width: 100%;
            height: 100vh;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .header {
            padding: 20px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #e5e5e5;
            flex-shrink: 0;
          }
          .header h1 {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
          .scrollable-content {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .form {
            padding: 20px 16px;
            min-height: min-content;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-row {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
          }
          .form-row .form-group {
            flex: 1;
            margin-bottom: 0;
          }
          label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 16px;
          }
          input {
            width: 100%;
            padding: 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
          }
          input[type="file"] {
            padding: 12px;
          }
          .image-preview {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-top: 12px;
          }
          .add-button {
            width: 100%;
            background: #000;
            color: white;
            border: none;
            padding: 20px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 16px;
          }
          .view-tickets-button {
            width: 100%;
            background: #007bff;
            color: white;
            border: none;
            padding: 20px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 20px;
          }
          .form-spacer {
            height: 40px;
          }

          @media (max-width: 480px) {
            .form-row {
              flex-direction: column;
              gap: 20px;
            }
            .form {
              padding: 16px;
            }
            input {
              padding: 14px;
            }
          }
        `}</style>
      </div>
    );
  }

  // QR View
  if (viewMode === 'qr' && currentTicket) {
    return (
      <div className="container">
        <div className="header">
          <button onClick={handleBackToList} className="back-button">←</button>
          <h1>Your Ticket</h1>
        </div>

        <div className="scrollable-content">
          <div className="qr-view">
            <div className="event-info">
              <h2>{currentTicket.artistName}</h2>
              <p>{currentTicket.eventName}</p>
              <p className="details">{currentTicket.date}, {currentTicket.time} - {currentTicket.venue}</p>
            </div>

            <div className="qr-code">
              <img src={currentTicket.qrCode} alt="QR Code" />
              <p className="security-note">Screenshots won't get you in</p>
            </div>

            <div className="seat-info">
              <div className="seat-item">
                <span>SEC {currentTicket.section}</span>
                <span>ROW {currentTicket.row}</span>
                <span>SEAT {currentTicket.seat}</span>
              </div>
            </div>

            <div className="gate-badge">
              GATE {currentTicket.gate}
            </div>

            <button className="wallet-button">
              Add to Apple Wallet
            </button>

            <div className="qr-spacer"></div>
          </div>
        </div>

        <style>{`
          .container {
            width: 100%;
            height: 100vh;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .header {
            padding: 20px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
          }
          .back-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
          }
          .header h1 {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
          }
          .scrollable-content {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .qr-view {
            padding: 20px;
            text-align: center;
            min-height: min-content;
          }
          .event-info h2 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 8px 0;
          }
          .event-info p {
            margin: 0 0 8px 0;
            color: #333;
            font-size: 16px;
          }
          .details {
            font-size: 14px;
            color: #666;
          }
          .qr-code img {
            width: 200px;
            height: 200px;
            margin: 30px 0;
          }
          .security-note {
            font-size: 14px;
            color: #666;
            font-style: italic;
            margin: 16px 0 0 0;
          }
          .seat-info {
            margin: 30px 0;
          }
          .seat-item {
            display: flex;
            justify-content: space-around;
            font-weight: 600;
            font-size: 16px;
          }
          .gate-badge {
            background: #000;
            color: white;
            padding: 20px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 20px;
            margin: 30px 0;
          }
          .wallet-button {
            width: 100%;
            background: #000;
            color: white;
            border: none;
            padding: 20px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 20px;
          }
          .qr-spacer {
            height: 40px;
          }
        `}</style>
      </div>
    );
  }

  // Detail View
  if (viewMode === 'detail' && currentTicket) {
    return (
      <div className="container">
        <div className="header">
          <button onClick={handleBackToList} className="back-button">←</button>
          <h1>Ticket Details</h1>
        </div>

        <div className="scrollable-content">
          <div className="ticket-detail">
            <div className="event-header">
              <h2>{currentTicket.artistName}</h2>
              <p>{currentTicket.eventName}</p>
              <p className="event-meta">{currentTicket.date}, {currentTicket.time} - {currentTicket.venue}</p>
            </div>

            <div className="ticket-info">
              <div className="info-row">
                <span>Section</span>
                <span>{currentTicket.section}</span>
              </div>
              <div className="info-row">
                <span>Row</span>
                <span>{currentTicket.row}</span>
              </div>
              <div className="info-row">
                <span>Seat</span>
                <span>{currentTicket.seat}</span>
              </div>
              <div className="info-row">
                <span>Gate</span>
                <span>{currentTicket.gate}</span>
              </div>
              <div className="info-row">
                <span>Ticket Type</span>
                <span>{currentTicket.ticketType}</span>
              </div>
              <div className="info-row">
                <span>Delivery</span>
                <span>{currentTicket.deliveryMethod}</span>
              </div>
            </div>

            <button onClick={handleViewQR} className="view-qr-button">
              View QR Code
            </button>

            <div className="detail-spacer"></div>
          </div>
        </div>

        <style>{`
          .container {
            width: 100%;
            height: 100vh;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .header {
            padding: 20px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
          }
          .back-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
          }
          .header h1 {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
          }
          .scrollable-content {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .ticket-detail {
            padding: 20px;
            min-height: min-content;
          }
          .event-header {
            text-align: center;
            margin-bottom: 30px;
          }
          .event-header h2 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 8px 0;
          }
          .event-meta {
            font-size: 14px;
            color: #666;
          }
          .ticket-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            border-bottom: 1px solid #e5e5e5;
            font-size: 16px;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .view-qr-button {
            width: 100%;
            background: #000;
            color: white;
            border: none;
            padding: 20px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
          }
          .detail-spacer {
            height: 40px;
          }
        `}</style>
      </div>
    );
  }

  // Main Tickets List View
  return (
    <div className="container">
      <div className="header">
        <h1>My Tickets</h1>
      </div>

      <div className="scrollable-content">
        {tickets.length > 0 ? (
          <>
            <div className="ticket-card">
              <div className="event-image">
                {currentTicket?.eventImage && (
                  <img src={currentTicket.eventImage} alt="Event" />
                )}
              </div>

              <div className="event-info">
                <h2>{currentTicket?.artistName}</h2>
                <p className="event-title">{currentTicket?.eventName}</p>
                <p className="event-details">
                  {currentTicket?.date}, {currentTicket?.time} - {currentTicket?.venue}
                </p>
              </div>

              <div className="gate-badge">
                GATE {currentTicket?.gate}
              </div>

              <div className="ticket-actions">
                <button onClick={handleViewTicket} className="action-button">
                  View Ticket
                </button>
                <button onClick={() => setViewMode('detail')} className="action-button">
                  Ticket Details
                </button>
                <div className="action-row">
                  <button className="action-button secondary">Transfer</button>
                  <button className="action-button secondary">Sell</button>
                </div>
              </div>

              <div className="venue-section">
                <p className="venue-name">{currentTicket?.venue}</p>
                <p className="other-venue">Metro Toronto Convention Centre</p>
              </div>

              {/* Navigation Dots */}
              {tickets.length > 1 && (
                <div className="navigation-dots">
                  {tickets.map((_, index) => (
                    <div
                      key={index}
                      className={`dot ${index === currentTicketIndex ? 'active' : ''}`}
                      onClick={() => setCurrentTicketIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              {tickets.length > 1 && (
                <div className="navigation-arrows">
                  <button 
                    onClick={handlePrevTicket} 
                    className="arrow-button"
                    disabled={currentTicketIndex === 0}
                  >
                    ‹
                  </button>
                  <button 
                    onClick={handleNextTicket} 
                    className="arrow-button"
                    disabled={currentTicketIndex === tickets.length - 1}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            <button onClick={handleAddNewTicket} className="add-new-button">
              + Add New Ticket
            </button>

            <div className="list-spacer"></div>
          </>
        ) : (
          <div className="empty-state">
            <p>No tickets yet</p>
            <button onClick={handleAddNewTicket} className="add-first-button">
              Create Your First Ticket
            </button>
          </div>
        )}
      </div>

      <style>{`
        .container {
          width: 100%;
          height: 100vh;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .header {
          padding: 20px 16px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e5e5;
          flex-shrink: 0;
        }
        .header h1 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
        .scrollable-content {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .ticket-card {
          margin: 20px;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .event-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .event-info {
          padding: 20px;
        }
        .event-info h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }
        .event-title {
          font-size: 16px;
          color: #333;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .event-details {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        .gate-badge {
          background: #000;
          color: white;
          padding: 16px 20px;
          font-weight: 700;
          font-size: 18px;
          text-align: center;
          margin: 0 20px;
          border-radius: 8px;
        }
        .ticket-actions {
          padding: 20px;
        }
        .action-button {
          width: 100%;
          background: #000;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
        }
        .action-button.secondary {
          background: #6c757d;
          flex: 1;
        }
        .action-row {
          display: flex;
          gap: 12px;
        }
        .venue-section {
          padding: 16px 20px;
          background: #f8f9fa;
          border-top: 1px solid #e5e5e5;
        }
        .venue-name {
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .other-venue {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        .navigation-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 16px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
        }
        .dot.active {
          background: #000;
        }
        .navigation-arrows {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 16px;
          transform: translateY(-50%);
        }
        .arrow-button {
          background: rgba(0,0,0,0.7);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .arrow-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .add-new-button {
          width: calc(100% - 40px);
          margin: 20px;
          background: #007bff;
          color: white;
          border: none;
          padding: 20px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        .empty-state p {
          font-size: 18px;
          color: #666;
          margin-bottom: 20px;
        }
        .add-first-button {
          background: #000;
          color: white;
          border: none;
          padding: 20px 32px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }
        .list-spacer {
          height: 40px;
        }
      `}</style>
    </div>
  );
};

export default DynamicTicketMaster;