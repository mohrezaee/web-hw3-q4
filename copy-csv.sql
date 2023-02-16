\copy aircraft_type FROM '/var/lib/postgresql/csv-files/aircraft_type.csv' DELIMITER ',' CSV HEADER;
\copy aircraft_layout FROM '/var/lib/postgresql/csv-files/aircraft_layout.csv' DELIMITER ',' CSV HEADER;
\copy aircraft FROM '/var/lib/postgresql/csv-files/aircraft.csv' DELIMITER ',' CSV HEADER;
\copy country FROM '/var/lib/postgresql/csv-files/country.csv' DELIMITER ',' CSV HEADER;
\copy city FROM '/var/lib/postgresql/csv-files/city.csv' DELIMITER ',' CSV HEADER;
\copy airport FROM '/var/lib/postgresql/csv-files/airport.csv' DELIMITER ',' CSV HEADER;
\copy flight FROM '/var/lib/postgresql/csv-files/flight.csv' DELIMITER ',' CSV HEADER;
DELETE FROM city WHERE timezone_name LIKE 'Europe/Kyiv';