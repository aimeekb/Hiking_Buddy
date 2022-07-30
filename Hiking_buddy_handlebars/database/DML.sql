-- Project Group 26, Step 3 Final
-- Team members: Aimee Bogle & Gunars Turaids

-- DML Step 3 Final --

----- Queries for Users ------------------------------------------------
--
-- READ (SELECT)
SELECT 
    id_user, 
    first_name, 
    last_name,
    email, 
    user_location, 
    user_dist_total
FROM Users;

-- CREATE (INSERT)
INSERT INTO Users (
    first_name, 
    last_name,
    email, 
    user_location, 
    user_dist_total  
) VALUES (
    :first_name_input, 
    :last_name_input,
    :email_input, 
    :user_location_input, 
    0               
);

-- UPDATE
SELECT id_user, first_name, last_name, email, user_location, user_dist_total
    FROM Users 
    WHERE id_user = :id_user_selected_from_browse_page;

-- for the actual update
UPDATE Users SET
    first_name = :first_name_input, 
    last_name = :last_name_input,
    email = :email_input, 
    user_location = :user_location_input,
    user_dist_total = :user_dist_total_input
WHERE id_user = :id_user_selected_from_browse_page;

-- DELETE
DELETE FROM Users WHERE id_user = :id_user_selected_from_browse_page; 


----- Queries for Trails --------------------------------------------------
-- READ (SELECT)
SELECT 
    id_trail, 
    trail_name,   
    trail_location,
    Trail_types.trail_type_description, 
    trail_distance 
FROM Trails INNER JOIN Trail_types ON Trails.id_trail_type = Trail_types.id_trail_type;

-- CREATE (INSERT)
-- query to populate dropdown
SELECT id_trail_type, trail_type_description FROM Trail_types

INSERT INTO Trails(
    id_trail_type,
    trail_name,
    trail_location,
    trail_distance
)VALUES(
    :id_trail_type_selected_from_dropdown,
    :trail_name,
    :trail_location,
    :trail_distance
);

-- UPDATE
SELECT 
    id_trail, 
    trail_name,   
    Trail_types.trail_type_description,
    trail_location, 
    trail_distance 
FROM Trails INNER JOIN Trail_types ON Trails.id_trail_type = Trail_types.id_trail_type
WHERE id_trail = :id_trail_selected_from_browse_page;

-- query to populate dropdown
SELECT id_trail_type, trail_type_description FROM Trail_types

-- for the actual update
UPDATE Trails SET
    id_trail_type = :id_trail_type_selected_from_drop_down, 
    trail_name = :trail_name_input,
    trail_location = :trail_location_input, 
    trail_distance = :trail_distance_input 
WHERE id_trail = :id_trail_selected_from_browse_page;

-- DELETE
DELETE FROM Trails WHERE id_trail = :id_trail_selected_from_browse_page; 


----- Queries for Trail_types --------------------------------------------------
-- READ (SELECT)
SELECT * FROM Trail_types;

-- CREATE (INSERT)
INSERT INTO Trail_types (
    trail_type_description
) VALUES (
    :trail_type_description_input
);

-- UPDATE
SELECT id_trail_type, trail_type_description
    FROM Trail_types 
    WHERE id_trail_type = :id_trail_type_selected_from_browse_page;

-- for the actual update
UPDATE Trail_types SET
    trail_type_description = :trail_type_description_input
WHERE trail_type = :trail_type_selected_from_browse_page;

-- DELETE
DELETE FROM Trail_types WHERE id_trail_type = :id_trail_type_selected_from_browse_page; 


----- Queries for Inventory_items --------------------------------------------------
-- READ (SELECT)
SELECT 
    id_item, 
    item_name, 
    item_description,
    item_weight 
FROM Inventory_items;

-- CREATE (INSERT)
INSERT INTO Inventory_items (
    item_name, 
    item_description,
    item_weight  
) VALUES (
    :item_name_input, 
    :item_description_input,
    :item_weight_input  
);

-- UPDATE
SELECT 
    id_item, 
    item_name, 
    item_description,
    item_weight 
FROM Inventory_items
WHERE id_item = :id_item_selected_from_browse_page;

-- for the actual update
UPDATE Inventory_items SET
    id_item = :id_item_input 
    item_name = :item_name_input 
    item_description = :item_description_input,
    item_weight = : item_weight_input
WHERE id_item = :id_itemr_selected_from_browse_page;

-- DELETE
DELETE FROM Inventory_items WHERE id_item = :id_item_selected_from_browse_page; 

-- SEARCH Inventory Items
-- text entry search
SELECT * FROM Inventory_items WHERE item_name LIKE  %:text_entry_from_search_form%
-- dropdown search
SELECT item_description FROM Inventory_items WHERE item_name = :item_name_selected_from_dropdown


----- Queries for Packing_lists --------------------------------------------------
-- READ (SELECT)
SELECT
    id_packing_list,
    Trail_types.trail_type_description
FROM Packing_lists
INNER JOIN Trail_types ON Packing_lists.id_trail_type = Trail_types.id_trail_type
ORDER BY id_packing_list;


-- CREATE (INSERT)
-- query to populate dropdown
SELECT id_trail_type, trail_type_description FROM Trail_types;

INSERT INTO Packing_lists(
    id_trail_type
) VALUES (
    :id_trail_type_selected_from_drop_down
);

-- UPDATE
SELECT 
    id_packing_list, 
    Packing_lists.id_trail_type,
    Trail_types.trail_type_description
FROM Packing_lists 
INNER JOIN Trail_types ON Packing_lists.id_trail_type = Trail_types.id_trail_type
WHERE id_packing_list = :id_packing_list_selected_from_browse_page
ORDER BY id_packing_list
;

-- for the actual update
UPDATE Packing_lists SET 
    id_trail_type = :id_trail_selected_from_drop_down
WHERE id_packing_list = :id_packing_list_selected_from_browse_page;

-- DELETE
DELETE FROM Packing_lists WHERE id_packing_list = :id_packing_list_selected_from_browse_page; 

----- Queries for Packing_list_details --------------------------------------------------
-- READ (SELECT)
SELECT
    id_packing_list_details,
    Inventory_items.item_name,
    Packing_lists.id_packing_list
FROM Packing_list_details
INNER JOIN Inventory_items ON Packing_list_details.id_item = Inventory_items.id_item
INNER JOIN Packing_lists ON Packing_list_details.id_packing_list = Packing_lists.id_packing_list;

-- CREATE (INSERT)
SELECT
    id_packing_list_details,
    Inventory_items.item_name,
    Packing_lists.id_packing_list
FROM Packing_list_details
INNER JOIN Inventory_items ON Packing_list_details.id_item = Inventory_items.id_item
INNER JOIN Packing_lists ON Packing_list_details.id_packing_list = Packing_lists.id_packing_list
WHERE id_packing_list_details = :id_packing_list_details_selected_from_browse_page; 

INSERT INTO Packing_list_details(
    id_item,
    id_packing_list
) VALUES (
    :id_item_selected_from_dropdown,
    :id_packing_list_selected_from_dropdown
);
-- UPDATE
UPDATE Packing_list_details SET 
    id_item = :id_user_selected_from_drop_down,
    id_packing_list = :id_packing_list_selected_from_drop_down
WHERE id_packing_list_details = :id_packing_list_details_selected_from_browse_page;

-- DELETE
DELETE FROM Packing_list_details 
WHERE id_packing_list_details = :id_packing_list_details_selected_from_browse_page; 

----- Queries for Hikes --------------------------------------------------
-- READ (SELECT)
SELECT 
    id_hike, 
    Users.first_name,
    Users.last_name,
    Trails.trail_name,   
    Packing_lists.id_packing_list,
    hike_date
FROM Hikes 
INNER JOIN Users ON Hikes.id_user = Users.id_user
INNER JOIN Trails ON Hikes.id_trail = Trails.id_trail
INNER JOIN Packing_lists ON Hikes.id_packing_list = Packing_lists.id_packing_list
ORDER BY id_hike
;

-- CREATE (INSERT)
-- queries to populate dropdowns
SELECT id_user, first_name, last_name FROM Users;
SELECT id_trail, trail_name FROM Trails;
SELECT id_packing_list, Trail_types.trail_type_description 
    FROM Packing_lists
    INNER JOIN Trail_types ON Packing_lists.id_trail_type = Trail_types.id_trail_type;

INSERT INTO Hikes(
    id_user,
    id_trail,
    id_packing_list,
    hike_date
)VALUES(
    :id_user_selected_from_dropdown,
    :id_trail_selected_from_dropdown,
    :id_packing_list_selected_from_dropdown,
    :hike_date_input
);


-- UPDATE
SELECT 
    id_hike, 
    Users.first_name,
    Users.last_name,
    Trails.trail_name,   
    Packing_lists.id_packing_list,
    hike_date
FROM Hikes 
INNER JOIN Users ON Hikes.id_user = Users.id_user
INNER JOIN Trails ON Hikes.id_trail = Trails.id_trail
INNER JOIN Packing_lists ON Hikes.id_packing_list = Packing_lists.id_packing_list
WHERE id_hike =:id_hike_selected_from_browse_page;
;

-- for the actual update
UPDATE Hikes SET 
    id_user = :id_user_selected_from_drop_down,
    id_trail = :id_trail_selected_from_drop_down,
    id_packing_list = :id_packing_list_selected_from_drop_down,
    hike_date
WHERE id_hike = :id_hike_selected_from_browse_page;

-- DELETE
DELETE FROM Hikes WHERE id_Hike = :id_Hike_selected_from_browse_page; 