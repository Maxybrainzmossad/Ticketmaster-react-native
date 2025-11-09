-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gmail VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_users_gmail (gmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TICKETS TABLE
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    artist_name VARCHAR(255),
    event_name VARCHAR(255),
    section VARCHAR(100),
    row_name VARCHAR(100),
    seat VARCHAR(100),
    event_date DATE,
    event_time TIME,
    location VARCHAR(255),
    ticket_type VARCHAR(150),
    level_name VARCHAR(150),
    number_value INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT chk_tickets_number_value CHECK (number_value >= 0),
    INDEX idx_tickets_user_id (user_id),
    INDEX idx_tickets_event_date (event_date),
    INDEX idx_tickets_event_name (event_name(100)),
    FULLTEXT INDEX ft_tickets_artist_event (artist_name, event_name),
    CONSTRAINT fk_tickets_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TICKET IMAGES TABLE
CREATE TABLE IF NOT EXISTS ticket_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ticket_images_ticket_id (ticket_id),
    CONSTRAINT fk_ticket_images_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
