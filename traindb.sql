
-- Creating Tables
CREATE TABLE Stations (
    station_id SERIAL PRIMARY KEY,
    station_name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Routes (
    route_id SERIAL PRIMARY KEY,
    start_station VARCHAR(255) NOT NULL,
    end_station VARCHAR(255) NOT NULL,
    total_km INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stations_Route (
    stations_route_id SERIAL PRIMARY KEY,
    route_id INT NOT NULL,
    station_id INT NOT NULL,
    sequence_order INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES Routes(route_id) ON DELETE CASCADE,
    FOREIGN KEY (station_id) REFERENCES Stations(station_id) ON DELETE CASCADE,
    CONSTRAINT seq_order_unique UNIQUE (route_id, sequence_order)
);

CREATE TABLE Trains (
    train_id SERIAL PRIMARY KEY,
    train_name VARCHAR(255) NOT NULL,
    train_type VARCHAR(100),
    total_capacity INT,
    speed INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Train_Route (
    train_id INT NOT NULL,
    route_id INT NOT NULL,
    distance INT,
    travel_time INTERVAL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (train_id, route_id),
    FOREIGN KEY (train_id) REFERENCES Trains(train_id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES Routes(route_id) ON DELETE CASCADE
);

CREATE TABLE public.users (
    id serial4 NOT NULL,
    "name" varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.bookings (
    id serial4 NOT NULL,
    user_id int4 NOT NULL,
    from_location varchar(255) NOT NULL,
    to_location varchar(255) NOT NULL,
    doj date NOT NULL,
    passenger_name varchar(255) NOT NULL,
    price_paid numeric(10, 2) NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (id),
    CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);


-- Altering Tables
ALTER TABLE Trains
ADD COLUMN price_per_km DECIMAL(10, 2);

-- Inserting Data into Trains
INSERT INTO Trains (train_name, train_type, total_capacity, speed, price_per_km)
VALUES
    ('Rajdhani Express', 'Express', 1200, 110, 15.00),
    ('Shatabdi Express', 'Superfast', 800, 130, 12.00),
    ('Intercity Express', 'Intercity', 600, 90, 8.00),
    ('Local Train', 'Local', 500, 40, 5.00),
    ('Shatabdi Express', 'Express', 1500, 130, 12.00),
    ('Rajdhani Express', 'Luxury', 1000, 140, 15.00),
    ('Deccan Queen', 'Express', 1000, 100, 10.00),
    ('Duronto Express', 'Express', 900, 150, 18.00),
    ('Vande Bharat Express', 'Semi High-Speed', 1200, 160, 20.00),
    ('Maharashtra Express', 'Express', 1100, 100, 14.00);

-- Inserting Data into Stations
INSERT INTO Stations (station_name, city, state, country)
VALUES
    ('New Delhi Railway Station', 'New Delhi', 'Delhi', 'India'),
    ('Mumbai CST', 'Mumbai', 'Maharashtra', 'India'),
    ('Howrah Junction', 'Kolkata', 'West Bengal', 'India'),
    ('Chennai Egmore', 'Chennai', 'Tamil Nadu', 'India'),
    ('Mumbai Lokmanya Tilak Terminus', 'Mumbai', 'Maharashtra', 'India'),
    ('Kolkata Sealdah Railway Station', 'Kolkata', 'West Bengal', 'India'),
    ('Bangalore City Railway Station', 'Bangalore', 'Karnataka', 'India'),
    ('Hyderabad Deccan', 'Hyderabad', 'Telangana', 'India'),
    ('Lucknow Charbagh', 'Lucknow', 'Uttar Pradesh', 'India'),
    ('Pune Junction', 'Pune', 'Maharashtra', 'India');

-- Inserting Data into Routes
INSERT INTO Routes (start_station, end_station, total_km)
VALUES
    ('New Delhi Railway Station', 'Howrah Junction', 1200),
    ('Mumbai CST', 'Chennai Egmore', 4000),
    ('Howrah Junction', 'Mumbai Lokmanya Tilak Terminus', 1600),
    ('Kolkata Sealdah Railway Station', 'Bangalore City Railway Station', 700),
    ('Hyderabad Deccan', 'Pune Junction', 1300),
    ('Lucknow Charbagh', 'Howrah Junction', 1800),
    ('Mumbai Lokmanya Tilak Terminus', 'Kolkata Sealdah Railway Station', 200),
    ('Chennai Egmore', 'Lucknow Charbagh', 2200),
    ('Hyderabad Deccan', 'New Delhi Railway Station', 4000),
    ('Pune Junction', 'Hyderabad Deccan', 1300);

-- Inserting Data into Stations_Route
INSERT INTO Stations_Route (route_id, station_id, sequence_order)
VALUES
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (2, 2, 1),
    (2, 4, 2),
    (2, 5, 3),
    (3, 3, 1),
    (3, 6, 2),
    (3, 7, 3),
    (4, 6, 1),
    (4, 7, 2),
    (4, 10, 3);

-- Inserting Data into Train_Route
INSERT INTO Train_Route (train_id, route_id, distance, travel_time)
VALUES
    (1, 1, 1200, '12 hours'::INTERVAL),
    (2, 2, 4000, '40 hours'::INTERVAL),
    (3, 3, 1600, '16 hours'::INTERVAL),
    (4, 4, 700, '7 hours'::INTERVAL),
    (5, 5, 1300, '13 hours'::INTERVAL),
    (6, 6, 1800, '18 hours'::INTERVAL),
    (7, 7, 200, '2 hours'::INTERVAL),
    (8, 8, 2200, '22 hours'::INTERVAL),
    (9, 9, 4000, '40 hours'::INTERVAL),
    (10, 10, 1300, '13 hours'::INTERVAL);
