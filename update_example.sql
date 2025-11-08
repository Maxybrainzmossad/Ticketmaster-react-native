-- Example UPDATE for editing ticket (parameterized, transactional, with image options)

-- Set parameters (edit as needed)
SET @ticket_id    = 10;
SET @user_id      = 1;
SET @artist_name  = 'Updated Artist';
SET @event_name   = 'Updated Event';
SET @section      = 'A10';
SET @row_name     = 'B';
SET @seat         = '12';
SET @event_date   = '2025-08-01';
SET @event_time   = '19:00:00';
SET @location     = 'Updated Location';
SET @ticket_type  = 'VIP';
SET @level_name   = 'Premium';
SET @number_value = 2;

-- Optional image operations (choose one of the commented options below)
SET @image_url = 'https://example.com/images/updated_image.png';
SET @image_id_to_update = NULL; -- set to a specific ticket_images.id to update that image, or NULL to insert new

-- Quick ownership / existence check (optional)
SELECT id, user_id, deleted_at
FROM tickets
WHERE id = @ticket_id AND user_id = @user_id;

-- Perform update inside a transaction
START TRANSACTION;

UPDATE tickets
SET
    artist_name = @artist_name,
    event_name  = @event_name,
    section     = @section,
    row_name    = @row_name,
    seat        = @seat,
    event_date  = @event_date,
    event_time  = @event_time,
    location    = @location,
    ticket_type = @ticket_type,
    level_name  = @level_name,
    number_value= @number_value,
    updated_at  = NOW()
WHERE id = @ticket_id AND user_id = @user_id;
SELECT ROW_COUNT() AS tickets_updated;

-- Image options (uncomment the desired block)
-- Option 1: Update a specific image row by id (ensure @image_id_to_update is set)
-- UPDATE ticket_images
-- SET image_url = @image_url, created_at = NOW()
-- WHERE id = @image_id_to_update AND ticket_id = @ticket_id;
-- SELECT ROW_COUNT() AS ticket_images_updated;

-- Option 2: Update all images for the ticket (if you want to replace all)
-- UPDATE ticket_images
-- SET image_url = @image_url, created_at = NOW()
-- WHERE ticket_id = @ticket_id;
-- SELECT ROW_COUNT() AS ticket_images_updated;

-- Option 3: Insert a new image for the ticket
-- INSERT INTO ticket_images (ticket_id, image_url, created_at)
-- VALUES (@ticket_id, @image_url, NOW());
-- SELECT LAST_INSERT_ID() AS new_image_id;

COMMIT;

-- Confirmation: show updated ticket and its images
SELECT t.*, COALESCE(t.deleted_at, NULL) AS deleted_at
FROM tickets t
WHERE t.id = @ticket_id AND t.user_id = @user_id;

SELECT ti.*
FROM ticket_images ti
WHERE ti.ticket_id = @ticket_id
ORDER BY ti.created_at;
