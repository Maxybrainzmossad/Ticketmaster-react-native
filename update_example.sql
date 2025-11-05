-- Example UPDATE for editing ticket

UPDATE tickets
SET
    artist_name = 'Updated Artist',
    event_name = 'Updated Event',
    section = 'A10',
    row_name = 'B',
    seat = '12',
    event_date = '2025-08-01',
    event_time = '19:00:00',
    location = 'Updated Location',
    ticket_type = 'VIP',
    level_name = 'Premium',
    number_value = 2
WHERE id = 10 AND user_id = 1;


-- Update image for this ticket
UPDATE ticket_images
SET image_url = 'https://example.com/images/updated_image.png'
WHERE ticket_id = 10;
