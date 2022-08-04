-- Project Group 26, Step 3 Final
-- Team members: Aimee Bogle & Gunars Turaids

-- DDL Step 3 Final --

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
-- Create DB table structure 

CREATE OR REPLACE TABLE Users (
    id_user INT AUTO_INCREMENT,
    email varchar(45),
    first_name varchar(45),
    last_name varchar(45), 
    user_location varchar(45),
    user_dist_total decimal,
    PRIMARY KEY (id_user)
);

CREATE OR REPLACE TABLE Trail_types (
    id_trail_type INT AUTO_INCREMENT,
    trail_type_description varchar(45),
    PRIMARY KEY (id_trail_type)
);

CREATE OR REPLACE TABLE Trails (
    id_trail INT AUTO_INCREMENT,
    id_trail_type INT,
    trail_name varchar(45),
    trail_location varchar(45),
    trail_distance DECIMAL (5,1),
    PRIMARY KEY (id_trail),
    FOREIGN KEY (id_trail_type) REFERENCES Trail_types(id_trail_type)
    ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Inventory_items (
    id_item INT AUTO_INCREMENT,
    item_name varchar(45),
    item_description varchar(45),
    item_weight DECIMAL (3,2),
    PRIMARY KEY (id_item)
);

CREATE OR REPLACE TABLE Packing_lists (
    id_packing_list INT AUTO_INCREMENT,
    id_trail_type INT,
    PRIMARY KEY (id_packing_list),
    FOREIGN KEY (id_trail_type) REFERENCES Trail_types(id_trail_type)
    ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Packing_list_details(
    id_packing_list_details INT AUTO_INCREMENT,
    id_item INT,
    id_packing_list INT,
    PRIMARY KEY (id_packing_list_details),
    CONSTRAINT FK_Packing_list_details_Inventory_items_id_item FOREIGN KEY (id_item)
        REFERENCES Inventory_items(id_item)
        ON DELETE SET NULL,
    CONSTRAINT FK_Packing_list_details_Packing_lists_id_packing_list FOREIGN KEY (id_packing_list)
        REFERENCES Packing_lists(id_packing_list)
        ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Hikes(
    id_hike INT AUTO_INCREMENT,
    id_user INT,
    id_trail INT,
    id_packing_list INT,
    hike_date DATE,
    PRIMARY KEY (id_hike),
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL,
    FOREIGN KEY (id_trail) REFERENCES Trails(id_trail) ON DELETE SET NULL,
    FOREIGN KEY (id_packing_list) REFERENCES Packing_lists(id_packing_list) ON DELETE SET NULL 
);

-- Insert sample data 

INSERT INTO Users (
    email,
    first_name,
    last_name,
    user_location,
    user_dist_total
)
VALUES 
(
    "SammyJ@email.com",
    "Sammy",
    "Jones",
    "Seattle",
    0
),
(
    "JaneyJaneJane@email.com",
    "Jane",
    "McJones",
    "Reno",
    0
),
(
    "SmoothEd@email.com",
    "Eddie",
    "Reinquist",
    "Los Angeles",
    0
);

INSERT INTO Trail_types (
    trail_type_description
)
VALUES 
(
    "Mountainous-Day"
),
(
    "Mountainous-Multi Day"
),
(
    "Arid-Day"
),
(
    "Arid-Multi Day"
),
(
    "Long Distance"
);

INSERT INTO Trails (
    id_trail_type,
    trail_name,
    trail_location,
    trail_distance
)
VALUES 
(
    1,
    "Hurrican Ridge",
    "Olympic National Park",
    11.4
),
(
    2,
    "John Muir Trail",
    "Sierra Nevada",
    211.7
),
(
    5,
    "Pacific Crest Trail",
    "West Coast USA",
    2665.8
),
(
    2,
    "West Coast Trail",
    "Vancouver Island",
    46.6
),
(
    1,
    "Half Dome",
    "Yosemite National Park",
    15.0
);

INSERT INTO Inventory_items (
    item_name,
    item_description,
    item_weight
)
VALUES 
(
    "Osprey Exos 58",
    "UL pack. 58 liters",
    2.60
),
(
    "Big Agnes Fly Creek UL2",
    "UL, 2 person tent",
    2.13
),
(
    "NeoAir XTherm MAX",
    "Sleeping pad: 6.9 R-Value",
    1.08
),
(
    "North Face FutureLite Boots",
    "Hiking Boots",
    0.90
),
(
    "Arcteryx Atom AR Hoody",
    "Ultralite rain jacket",
    1.60
);

INSERT INTO Packing_lists (
    id_trail_type
)
VALUES 
(
    1
),
(
    2
),
(
    3
),
(
    4
);

INSERT INTO Packing_list_details (
    id_item,
    id_packing_list
)
VALUES 
(
    1,
    3
),
(
    3,
    1
),
(
    2,
    3
),
(
    1,
    4
);

INSERT INTO Hikes (
    id_user,
    id_trail,
    id_packing_list,
    hike_date
)
VALUES 
(
    1,
    1,
    1,
    '2022-07-11'
),
(
    3,
    2,
    2,
    '2022-04-02'
),
(
    2,
    4,
    3,
    '2022-05-14'
),
(
    1,
    5,
    4,
    '2022-03-14'
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
