-- Example DELETE ticket (hard delete)

-- If ON DELETE CASCADE exists, this one query removes ticket and its images
DELETE FROM tickets
WHERE id = 10 AND user_id = 1;


-- If no cascade, delete image first
-- DELETE FROM ticket_images WHERE ticket_id = 10;
-- DELETE FROM tickets WHERE id = 10 AND user_id = 1;
