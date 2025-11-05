-- Example INSERT for creating a ticket

INSERT INTO tickets (
    user_id,
    artist_name,
    event_name,
    section,
    row_name,
    seat,
    event_date,
    event_time,
    location,
    ticket_type,
    level_name,
    number_value
) VALUES (
    1,
    'Fall Out Boy',
    'So Much For (Tour) Dust',
    'LAWN30',
    'GA3',
    '20',
    '2025-07-18',
    '18:30:00',
    'Blossom Music Center',
    'Seated Ticket - Side view',
    'Side view',
    1
);

-- Get last inserted ticket id
SET @ticket_id = LAST_INSERT_ID();

-- Insert Ticket Image
INSERT INTO ticket_images (ticket_id, image_url)
VALUES (@ticket_id, 'https://example.com/images/ticket_123.png');
