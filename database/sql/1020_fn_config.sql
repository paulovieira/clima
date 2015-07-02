
/*

	1. READ

*/


-- NOTE: we explicitely execute a DROP FUNCTION (instead of CREATE OR REPLACE) because the replacement will not work if the output changes; by calling DROP wemake sure the function definition will really be updated

DROP FUNCTION IF EXISTS config_read(json);

CREATE FUNCTION config_read(options json DEFAULT '[{}]')

-- return table using the definition of the config table
RETURNS TABLE(
	--id          INT,
	key TEXT,
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

	command := 'SELECT key, value FROM config ';
			
	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id')  INTO id;
	SELECT json_extract_path_text(options_row, 'key') INTO key;

	number_conditions := 0;
	
	-- criteria: id
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
insert into config (key, value) values
	('key1',  '"paulovieira@gmail.com"'),
	('key2',  '{"name": "paulovieira@gmail.com"}'),
	('key3',  '[{ "x1": "a_paulovieira@gmail.com" },{ "x2": "b_paulovieira@gmail.com" }]'),
	('key4',  '[[{ "name": "xpaulovieira@gmail.com" },{ "name": "ypaulovieira@gmail.com" }], [{ "name": "zpaulovieira@gmail.com" }]]')


select * from config
*/


/*
select * from  config_read('{"key": "key1"}');
select * from  config_read('{"key": "key2"}');
select * from  config_read('{"key": "key3"}');
select * from  config_read('{"key": "key4"}');
*/





DROP FUNCTION IF EXISTS config_create(json);

CREATE FUNCTION config_create(input_data json)
RETURNS SETOF config AS
$BODY$
DECLARE
	new_row config%ROWTYPE;
	current_row config%ROWTYPE;
	new_id INT;
BEGIN

	SELECT input_data->>'id' INTO new_id;
	IF new_id IS NULL OR NOT EXISTS (SELECT * FROM config WHERE id = new_id) THEN
		INSERT INTO config(
			id,
			key,
			value
			)
		VALUES (
			COALESCE(new_id, nextval(pg_get_serial_sequence('config', 'id'))),
			input_data->>'key',
			(input_data->'value')::jsonb
			)
		RETURNING 
			*
		INTO STRICT 
			new_row;

		RETURN NEXT new_row;
	ELSE

		current_row.id = new_id;
		current_row.value = '"WARNING: a row with the given id exists already present. Data will not be inserted."';

		RAISE WARNING 'A row with the given id exists already present. Data will not be inserted (id=%)', current_row.id;

		RETURN NEXT current_row;

	END IF;

RETURN;
END;
$BODY$
LANGUAGE plpgsql;


/*
select * from config

select * from config_create('{
	"key": "key5",
	"value": "paulovieira@gmail.com"
}');

select * from config_create('{
	"key": "key6",
	"value": {"name": "paulovieira@gmail.com" }
}');

select * from config_create('{
	"key": "key7",
	"value": [{ "x1": "paulovieira@gmail.com" },{ "x2": "paulovieira@gmail.com" }]
}');

select * from config_create('{
	"key": "key8",
	"value": [[{ "name": "paulovieira@gmail.com" },{ "name": "paulovieira@gmail.com" }], [{ "name": "paulovieira@gmail.com" }]]
}');
*/







DROP FUNCTION IF EXISTS config_update(json);

CREATE FUNCTION config_update(input_data json)
RETURNS SETOF config AS
$$
DECLARE
	updated_row config%ROWTYPE;
	--input_row config%ROWTYPE;
	command text;
BEGIN

	-- generate a dynamic command: 
	--   update config set value = '{"x": 1}'::jsonb where key = 'key8'

	command := 'UPDATE config SET ';
	command = format(command || ' value = %L ', input_data->'value');
	command = format(command || ' WHERE key = %L RETURNING *;', input_data->>'key');

	EXECUTE 
		command

	INTO STRICT
		updated_row;


	RETURN NEXT 
		updated_row;

RETURN;
END;
$$
LANGUAGE plpgsql;


/*
select * from config

update config set value = json_build_object('rootKey', '{"x": 1}'::json)::jsonb where key = 'key8'




select * from config_update('{
	"key": "key5",
	"value": "xpaulovieira@gmail.com"
}');

select * from config_update('{
	"key": "key6",
	"value": {"name": "xpaulovieira@gmail.com" }
}');

select * from config_update('{
	"key": "key7",
	"value": [{ "yx1": "xpaulovieira@gmail.com" },{ "x2": "xxpaulovieira@gmail.com" }]
}');

select * from config_update('{
	"key": "key8",
	"value": [[{ "xrootKey": "xpaulovieira@gmail.com" },{ "rootKey": "paulovieira@gmail.com" }], [{ "rootKey": "paulovieira@gmail.com" }]]
}');
*/





DROP FUNCTION IF EXISTS config_delete(json);

CREATE FUNCTION config_delete(options json DEFAULT '[{}]')
RETURNS TABLE(deleted_id int, deleted_key text) AS
$$
DECLARE
	deleted_row config%ROWTYPE;
	options_row JSON;

	-- fields to be used in WHERE clause
	id_to_delete INT;
	key_to_delete TEXT;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;


FOR options_row IN ( select json_array_elements(options) ) LOOP

	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id') INTO id_to_delete;
	SELECT json_extract_path_text(options_row, 'key') INTO key_to_delete;
	
	IF id_to_delete IS NOT NULL THEN
		DELETE FROM config
		WHERE id = id_to_delete
		RETURNING *
		INTO deleted_row;

		deleted_id   := deleted_row.id;
		deleted_key   := deleted_row.key;

		IF deleted_id IS NOT NULL THEN
			RETURN NEXT;
		END IF;
	
	ELSEIF key_to_delete IS NOT NULL THEN
		DELETE FROM config
		WHERE key = key_to_delete
		RETURNING *
		INTO deleted_row;

		deleted_id   := deleted_row.id;
		deleted_key   := deleted_row.key;

		IF deleted_key IS NOT NULL THEN
			RETURN NEXT;
		END IF;
	END IF;
END LOOP;

RETURN;
END;
$$
LANGUAGE plpgsql;


/*
select * from config

select * from config_delete('{"key": "key6"}');

select * from config_delete('[{"key": "key5"}, {"key": "key7"}]');

select * from config_delete('[{"id": 2}, {"key": "key4"}]');
*/
