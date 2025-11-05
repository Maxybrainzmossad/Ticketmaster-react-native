-- Example SELECT ticket with image by ticket id

SELECT 
    t.*,
    ti.image_url
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.id = 10;


-- Get all tickets for a user

SELECT 
    t.*,
    ti.image_url
FROM tickets t
LEFT JOIN ticket_images ti ON t.id = ti.ticket_id
WHERE t.user_id = 1
ORDER BY t.created_at DESC;
