-- Example DELETE ticket (improved)
-- Usage: set the variables below to the ticket id and user id you want to remove.

-- Set parameters
SET @ticket_id  = 10;
SET @user_id    = 1;

-- Option A: If your foreign key is defined with ON DELETE CASCADE
-- This removes the ticket and any dependent rows automatically.
DELETE FROM tickets
WHERE id = @ticket_id
  AND user_id = @user_id;
SELECT ROW_COUNT() AS tickets_deleted_cascade;

-- Option B: If there is NO cascade, do explicit delete inside a transaction
-- (uncomment to use)
-- START TRANSACTION;
-- DELETE FROM ticket_images WHERE ticket_id = @ticket_id;
-- DELETE FROM tickets WHERE id = @ticket_id AND user_id = @user_id;
-- COMMIT;
-- SELECT ROW_COUNT() AS last_delete_count;

-- Option C: Soft-delete alternative (if your tickets table has a deleted_at column)
-- (uncomment to use)
-- UPDATE tickets
-- SET deleted_at = NOW()
-- WHERE id = @ticket_id AND user_id = @user_id;
-- SELECT ROW_COUNT() AS tickets_soft_deleted;

-- Check ticket existence/result
SELECT id, user_id, COALESCE(deleted_at, 'NULL') AS deleted_at
FROM tickets
WHERE id = @ticket_id AND user_id = @user_id;
