-- Create additional column name board_id
ALTER TABLE statuses
ADD board_id INTEGER not null default 1;

-- Separated values for default second board
INSERT INTO statuses (title, board_id)
            VALUES ('new', 2);
INSERT INTO statuses (title, board_id)
            VALUES ('in progress', 2);
INSERT INTO statuses (title, board_id)
            VALUES ('testing', 2);
INSERT INTO statuses (title, board_id)
            VALUES ('done', 2);

-- Constraint for new column
ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id);