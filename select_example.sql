-- Set parameters (change as needed)
SET @ticket_id  = 10;
SET @user_id    = 1;
SET @limit      = 25;
SET @offset     = 0;
SET @search_term = 'Fall Out Boy';

-- Example SELECT ticket with image by ticket id

SELECT 
    t.*,
    ti.image_url
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.id = @ticket_id
  AND (t.deleted_at IS NULL)
GROUP BY t.id;

-- Example SELECT tickets for a user

SELECT 
    t.*,
    ti.image_url
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.user_id = @user_id
  AND (t.deleted_at IS NULL)
ORDER BY t.created_at DESC;

-- Option A: Single ticket by id, aggregated images (one row, images as JSON and CSV)
SELECT
    t.*,
    -- JSON_ARRAYAGG may require MySQL 5.7+; GROUP_CONCAT used as fallback for simple lists
    JSON_ARRAYAGG(ti.image_url) AS images_json,
    GROUP_CONCAT(DISTINCT ti.image_url SEPARATOR ',') AS images_csv
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.id = @ticket_id
  AND (t.deleted_at IS NULL)
GROUP BY t.id;

-- Option A2: Single ticket raw rows (one row per image) if you prefer that shape
SELECT 
    t.*,
    ti.image_url
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.id = @ticket_id
  AND (t.deleted_at IS NULL)
ORDER BY ti.created_at;

-- Option B: Get paginated tickets for a user, aggregated images per ticket
SELECT
    t.id,
    t.user_id,
    t.artist_name,
    t.event_name,
    t.event_date,
    t.created_at,
    JSON_ARRAYAGG(ti.image_url) AS images_json,
    GROUP_CONCAT(DISTINCT ti.image_url SEPARATOR ',') AS images_csv
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.user_id = @user_id
  AND (t.deleted_at IS NULL)
GROUP BY t.id
ORDER BY t.created_at DESC
LIMIT @limit OFFSET @offset;

-- Option B2: Count for pagination
SELECT COUNT(*) AS total_tickets
FROM tickets t
WHERE t.user_id = @user_id
  AND (t.deleted_at IS NULL);

-- Option C: Full-text search (if FULLTEXT index exists on artist_name/event_name)
-- Uses natural language mode; adjust to BOOLEAN MODE if needed
SELECT
    t.id,
    t.artist_name,
    t.event_name,
    t.event_date,
    JSON_ARRAYAGG(ti.image_url) AS images_json
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE (t.deleted_at IS NULL)
  AND (
        (MATCH(t.artist_name, t.event_name) AGAINST (@search_term IN NATURAL LANGUAGE MODE))
        OR (t.artist_name LIKE CONCAT('%', @search_term, '%'))
        OR (t.event_name LIKE CONCAT('%', @search_term, '%'))
      )
GROUP BY t.id
ORDER BY t.created_at DESC
LIMIT @limit OFFSET @offset;
