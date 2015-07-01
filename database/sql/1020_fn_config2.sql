DROP TABLE config3;
CREATE TABLE IF NOT EXISTS config3( 
	id SERIAL PRIMARY KEY,
	config_key TEXT NOT NULL UNIQUE,
	config_value JSON NOT NULL

--	CONSTRAINT config_value_must_be_object CHECK (json_typeof(config_value) = 'object')
);

insert into config3 (config_key, config_value) values
('adminEmail',  '"paulovieira@gmail.com"'),
('adminEmail',  '{ "rootKey": "paulovieira@gmail.com" }'),
('test1',       '{ "rootKey": [{"name": "a", "age": 10}, {"name": "b", "age": 11}] }')


insert into config3 (config_key, config_value) values
('adminEmail2',  '{ "rootKey": "paulovieira@gmail.com" }')

insert into config3 (config_key, config_value) values
('adminEmail4',  '[{ "rootKey": "paulovieira@gmail.com" }, { "rootKey": "paulovieira@gmail.com" }]')

select * from config3


select * from json_build_object('xx', 123)::jsonb


select * from to_json('{"id": 1}'::text)
/*
TODO:
-select * from  config_read2('[{"key": "adminEmail"} ]');
check if the value is a string ready to be used in node, or if it has extra '"'

-to create/update, we might have
*/

select * from config2;

select key, config_data->'dummyKey' as value from config2
select key, config_data->>'dummyKey' as value from config2

select * from  config_read2('[{"key": "adminEmail"} ]');

select * from  config_read2('{"key": "test1"}');
select * from  config_read2('{}');



insert into config2 (config_key, config_value) values
('adminEmail',  '{ "rootKey": "paulovieira@gmail.com" }'),
('test1',       '{ "rootKey": [{"name": "a", "age": 10}, {"name": "b", "age": 11}] }')

--DROP TABLE config2
CREATE TABLE IF NOT EXISTS config2( 
	id SERIAL PRIMARY KEY,
	config_key TEXT NOT NULL,
	config_value JSONB NOT NULL,

	CONSTRAINT config_value_must_be_object CHECK (jsonb_typeof(config_value) = 'object')
);




DROP FUNCTION IF EXISTS config_read2(json);


CREATE FUNCTION config_read2(options json DEFAULT '[{}]')

-- return table using the definition of the config table
RETURNS TABLE(
	--id          INT,
	key   TEXT,
	value JSONB
)
AS
$BODY$

DECLARE
	options_row json;
	command text;
	number_conditions INT;

	-- fields to be used in WHERE clause
	id INT;
	key TEXT;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;


FOR options_row IN ( select json_array_elements(options) ) LOOP

	command := 'SELECT config_key as key, config_value->''rootKey'' as value FROM config2 ';
			
	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id')  INTO id;
	SELECT json_extract_path_text(options_row, 'key') INTO key;

	number_conditions := 0;
	
	-- criteria: id (for the config table we should be using "key" instead of "id")
	IF id IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';  
		ELSE                           command = command || ' AND';
		END IF;

		command = format(command || ' id = %L', id);
		number_conditions := number_conditions + 1;
	END IF;

	-- criteria: key
	IF key IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';  
		ELSE                           command = command || ' AND';
		END IF;

		command = format(command || ' config_key = %L', key);
		number_conditions := number_conditions + 1;
	END IF;

	
	command := command || ' ORDER BY id DESC;';

	RETURN QUERY EXECUTE command;

END LOOP;
		
RETURN;
END;
$BODY$
LANGUAGE plpgsql;






/*

	1. READ

*/


-- NOTE: we explicitely execute a DROP FUNCTION (instead of CREATE OR REPLACE) because the replacement will not work if the output changes; by calling DROP wemake sure the function definition will really be updated


/*
TODO:
-select * from  config_read2('[{"key": "adminEmail"} ]');
check if the value is a string ready to be used in node, or if it has extra '"'
*/

select * from config2;

select key, config_data->'dummyKey' as value from config2
select key, config_data->>'dummyKey' as value from config2

select * from  config_read2('[{"key": "adminEmail"} ]');

select * from  config_read2('[{"id": 1}, {"key": "test1"} ]');



insert into config2 (key, config_data) values
--('adminEmail',  '{ "dummyKey": "paulovieira@gmail.com" }')
('test1',  '{ "dummyKey": [{"name": "a", "age": 10}, {"name": "b", "age": 11}] }')

CREATE TABLE IF NOT EXISTS config2( 
	id SERIAL PRIMARY KEY,
	key TEXT NOT NULL,
	config_data JSONB NOT NULL,

	CONSTRAINT config_data_must_be_object CHECK (jsonb_typeof(config_data) = 'object')
);


DROP FUNCTION IF EXISTS config_read2(json);


CREATE FUNCTION config_read2(options json DEFAULT '[{}]')

-- return table using the definition of the config table
RETURNS TABLE(
	--id          INT,
	key         TEXT,
	config_data JSONB
)
AS
$BODY$

DECLARE
	options_row json;
	command text;
	number_conditions INT;

	-- fields to be used in WHERE clause
	id INT;
	key TEXT;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;


FOR options_row IN ( select json_array_elements(options) ) LOOP

	command := 'SELECT key, config_data->''dummyKey'' as value FROM config2 ';
			
	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id')    INTO id;
	SELECT json_extract_path_text(options_row, 'key')  INTO key;

	number_conditions := 0;
	
	-- criteria: id (for the config table we should be using "key" instead of "id")
	IF id IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';  
		ELSE                           command = command || ' AND';
		END IF;

		command = format(command || ' id = %L', id);
		number_conditions := number_conditions + 1;
	END IF;

	-- criteria: key
	IF key IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';  
		ELSE                           command = command || ' AND';
		END IF;

		command = format(command || ' key = %L', key);
		number_conditions := number_conditions + 1;
	END IF;

	
	command := command || ' ORDER BY id DESC;';

	RETURN QUERY EXECUTE command;

END LOOP;
		
RETURN;
END;
$BODY$
LANGUAGE plpgsql;





/*

select * from config

select * from  config_read('[{}]');

select * from  config_read('[{"key": "adminEmail"} ]');

select * from  config_read('[{"key": "adminEmail"}, {"key": "publicUrl"}]');


*/




/*

	2. CREATE

*/

DROP FUNCTION IF EXISTS config_create(json, json);

CREATE FUNCTION config_create(input_data json, options json DEFAULT '[{}]')
RETURNS SETOF config AS
$BODY$
DECLARE
	new_row config%ROWTYPE;
	input_row config%ROWTYPE;
	current_row config%ROWTYPE;
	new_id INT;
BEGIN


-- convert the json argument from object to array of (one) objects
IF  json_typeof(input_data) = 'object'::text THEN
	input_data = ('[' || input_data::text ||  ']')::json;
END IF;


FOR input_row IN (select * from json_populate_recordset(null::config, input_data)) LOOP

	SELECT input_row.id INTO new_id;
	IF new_id IS NULL OR NOT EXISTS (SELECT * FROM config WHERE id = new_id) THEN
		INSERT INTO config(
			id,
			config_data
			)
		VALUES (
			COALESCE(new_id, nextval(pg_get_serial_sequence('config', 'id'))),
			input_row.config_data
			)
		RETURNING 
			*
		INTO STRICT 
			new_row;
	
		RETURN NEXT new_row;
	ELSE

		current_row.id = new_id;
		current_row.config_data = '"WARNING: a row with the given id exists already present. Data will not be inserted."';

		RAISE WARNING 'A row with the given id exists already present. Data will not be inserted (id=%)', current_row.id;

		RETURN NEXT current_row;

	END IF;

END LOOP;

RETURN;
END;
$BODY$
LANGUAGE plpgsql;

/*
select * from config order by id desc

select * from config_create('[
	{"config_data": {"publicUrl": "http://xxx.com"}}
]');


select * from config_create('[
	{"config_data": {"adminEmail": "paulo@gmail.com"}},
	{"config_data": {"noRowsForInitialData": 1000 }}
]');



*/




/*

	3. UPDATE

*/

DROP FUNCTION IF EXISTS config_update(json, json);

CREATE FUNCTION config_update(input_data json, options json DEFAULT '[{}]')
RETURNS SETOF config AS
$$
DECLARE
	updated_row config%ROWTYPE;
	input_row config%ROWTYPE;
	command text;
BEGIN


-- convert the json argument from object to array of (one) objects
IF  json_typeof(input_data) = 'object'::text THEN
	input_data = ('[' || input_data::text ||  ']')::json;
END IF;


FOR input_row IN (select * from json_populate_recordset(null::config, input_data)) LOOP

	-- generate a dynamic command: first the base query
	command := 'UPDATE config SET ';

	-- then add (cumulatively) the fields to be updated; those fields must be present in the input_data json;
	IF input_row.config_data IS NOT NULL THEN
		command = format(command || 'config_data = %L, ', input_row.config_data);
	END IF;

	-- remove the comma and space from the last if
	command = left(command, -2);
	command = format(command || ' WHERE id = %L RETURNING *;', input_row.id);

	--RAISE NOTICE 'Dynamic command: %', command;

	EXECUTE 
		command

	INTO STRICT
		updated_row;


	RETURN NEXT 
		updated_row;
END LOOP;

RETURN;
END;
$$
LANGUAGE plpgsql;


/*

select * from config_update('[
	{"id": 5, "config_data": {"publicUrl": "http://yyy.com"} }
]');


select * from config_update('{
	"id": 1003, 
	"config_data": { "iii": [ [{"a": 1}, {"b": 2}], [{"c": 3}, {"d": 5}]] }
}')


*/





/*

	4. DELETE

*/

DROP FUNCTION IF EXISTS config_delete(json);

CREATE FUNCTION config_delete(options json DEFAULT '[{}]')
RETURNS TABLE(deleted_id int) AS
$$
DECLARE
	deleted_row config%ROWTYPE;
	options_row JSON;

	-- fields to be used in WHERE clause
	id_to_delete INT;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;


FOR options_row IN ( select json_array_elements(options) ) LOOP

	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id') INTO id_to_delete;
	
	IF id_to_delete IS NOT NULL THEN
		DELETE FROM config
		WHERE id = id_to_delete
		RETURNING *
		INTO deleted_row;

		deleted_id   := deleted_row.id;

		IF deleted_id IS NOT NULL THEN
			RETURN NEXT;
		END IF;
	END IF;
		
END LOOP;

RETURN;
END;
$$
LANGUAGE plpgsql;


/*

select * from config order by id desc;
select * from config_delete('[{"id": 3}]');
*/



