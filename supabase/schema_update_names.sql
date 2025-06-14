-- Update form_submissions table to use firstName and lastName
ALTER TABLE form_submissions 
  RENAME COLUMN fname TO first_name;

ALTER TABLE form_submissions 
  RENAME COLUMN lname TO last_name;