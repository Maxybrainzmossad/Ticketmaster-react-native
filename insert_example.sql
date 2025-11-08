-- Example INSERT for creating a ticket (improved and reusable)
-- Set parameters (change these values as needed)
SET @user_id      = 1;
SET @artist_name  = 'Fall Out Boy';
SET @event_name   = 'So Much For (Tour) Dust';
SET @section      = 'LAWN30';
SET @row_name     = 'GA3';
SET @seat         = '20';
SET @event_date   = '2025-07-18';
SET @event_time   = '18:30:00';
SET @location     = 'Blossom Music Center';
SET @ticket_type  = 'Seated Ticket - Side view';
SET @level_name   = 'Side view';
SET @number_value = 1;

-- Optional: comma-separated list of image URLs (single quoted, comma separated)
-- Example: SET @image_urls = 'https://example.com/img1.png,https://example.com/img2.png';
SET @image_urls   = 'https://example.com/images/ticket_123.png';

-- Optionally check for a likely duplicate before inserting (uncomment to use)
-- SELECT id INTO @existing_ticket_id FROM tickets
-- WHERE user_id = @user_id
--   AND artist_name = @artist_name
--   AND event_name = @event_name
--   AND event_date = @event_date
-- LIMIT 1;
-- IF @existing_ticket_id IS NOT NULL THEN
--   SELECT 'duplicate' AS status, @existing_ticket_id AS ticket_id;
--   -- Skip insert or handle as needed
-- END IF;

-- Perform insert inside a transaction to keep ticket and images consistent
START TRANSACTION;

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
    @user_id,
    @artist_name,
    @event_name,
    @section,
    @row_name,
    @seat,
    @event_date,
    @event_time,
    @location,
    @ticket_type,
    @level_name,
    @number_value
);

SET @ticket_id = LAST_INSERT_ID();

-- Insert one or more images for the ticket
-- If multiple URLs present in @image_urls, split and insert accordingly.
-- Simple single-image insert:
INSERT INTO ticket_images (ticket_id, image_url)
VALUES (@ticket_id, @image_urls);

COMMIT;

-- Confirmation: show inserted ticket and images
SELECT t.*, COALESCE(t.deleted_at, NULL) AS deleted_at
FROM tickets t
WHERE t.id = @ticket_id;

SELECT ti.*
FROM ticket_images ti
WHERE ti.ticket_id = @ticket_id;
