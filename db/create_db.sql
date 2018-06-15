CREATE SCHEMA salesforce;


CREATE TABLE salesforce.investor (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  active BOOLEAN DEFAULT true,
  last_password_change TIMESTAMP
);

CREATE USER salesforce WITH PASSWORD 'password';
GRANT USAGE ON SCHEMA salesforce TO salesforce;
GRANT ALL ON TABLE salesforce.investor TO salesforce;