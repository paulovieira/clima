

/*

	1. READ

*/

DROP VIEW IF EXISTS geo_tables;
CREATE VIEW geo_tables AS
	SELECT schemaname as "schema_name", tablename as "table_name"
	FROM pg_tables pgt
	WHERE pgt.schemaname = format('%I', 'geo');



DROP FUNCTION IF EXISTS shapes_read(json);

CREATE FUNCTION shapes_read(options json DEFAULT '[{}]')

-- return table, uses the definition of the shapes table + extra data from the join
RETURNS TABLE(
	id INT,
	schema_name TEXT,
	table_name TEXT,
	srid INT,
	geometry_type TEXT,
	attributes_info JSONB,
	description JSONB,
	file_id INT,
	owner_id INT,
	created_at timestamptz,
	inspire JSONB,
	file_data JSON,
	owner_data JSON
--	geometry_type TEXT,
--	shape_columns_data JSON
	)
AS
$BODY$

DECLARE
	options_row json;
	command text;
	number_conditions INT;
--	shape_columns_data_cte TEXT;
--	shape_geom_type_cte TEXT;

	-- fields to be used in WHERE clause
	id INT;
	table_name TEXT;
	table_name_starts_with TEXT;
BEGIN
/*
shape_columns_data_cte := '
	shape_columns_data_cte AS (
		SELECT
			s.id AS shape_id,
			json_agg(json_build_object(
				''column_number'', a.attnum, 
				''column_name'', a.attname,
				''data_type'', a.atttypid::regtype::text)
					) as shape_columns_data
			
		FROM shapes s
		LEFT JOIN pg_attribute a
			ON a.attrelid = (s.schema_name || ''.'' || ''"'' || s.table_name || ''"'')::regclass
		AND    a.attnum > 0
		AND    NOT a.attisdropped
		GROUP BY shape_id
		ORDER  BY s.id
	)
';

shape_geom_type_cte := '
	shape_geom_type_cte AS (
		SELECT
			s.id AS shape_id,
			gc.type::TEXT as geometry_type
		FROM shapes s
		LEFT JOIN geometry_columns gc
		on gc.f_table_schema = format(''%I'', s.schema_name)
		AND gc.f_table_name = format(''%I'', s.table_name)
		and gc.f_geometry_column = ''geom''
		ORDER  BY s.id
	) 
';
*/
-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;


FOR options_row IN ( select json_array_elements(options) ) LOOP

	BEGIN -- begin block to catch exceptions
/*
	command := 'WITH '
		|| shape_columns_data_cte || ', '
		|| shape_geom_type_cte
		|| 'SELECT 
			s.*, 
			(select row_to_json(_dummy_) from (select f.*) as _dummy_) as file_data,
			(select row_to_json(_dummy_) from (select u.*) as _dummy_) as owner_data,
			sgt.geometry_type as geometry_type,
			scd.shape_columns_data as shape_columns_data

		FROM shapes s 
		INNER JOIN shape_columns_data_cte scd
			ON s.id = scd.shape_id
		INNER JOIN shape_geom_type_cte sgt
			ON s.id = sgt.shape_id
		LEFT JOIN users u
			ON s.owner_id = u.id
		INNER JOIN files f
			ON s.file_id = f.id';
*/
	command := 'SELECT 
			s.*, 
			(select row_to_json(_dummy_) from (select f.*) as _dummy_) as file_data,
			(select row_to_json(_dummy_) from (select u.*) as _dummy_) as owner_data

		FROM shapes s 
		LEFT JOIN users u
			ON s.owner_id = u.id
		LEFT JOIN files f
			ON s.file_id = f.id';
			
	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id')   INTO id;
	SELECT json_extract_path_text(options_row, 'table_name') INTO table_name;
	SELECT json_extract_path_text(options_row, 'table_name_starts_with') INTO table_name_starts_with;
/**/
	number_conditions := 0;

	-- criteria: id
	IF id IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';  
		ELSE                           command = command || ' AND';
		END IF;

		command = command || format(' s.id = %L', id);
		number_conditions := number_conditions + 1;
	END IF;

	-- criteria: table_name
	IF table_name IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';
		ELSE                           command = command || ' AND';
		END IF;

		command = command || format(' s.table_name = %L', table_name);
		number_conditions := number_conditions + 1;
	END IF;

	-- criteria: table_name starts with
	IF table_name_starts_with IS NOT NULL THEN
		IF number_conditions = 0 THEN  command = command || ' WHERE';
		ELSE                           command = command || ' AND';
		END IF;

		table_name_starts_with := table_name_starts_with || '%';
		command = command || format(' s.table_name ILIKE %L', table_name_starts_with);
		number_conditions := number_conditions + 1;
	END IF;

	command := command || ' ORDER BY s.created_at DESC;';

	RETURN QUERY EXECUTE command;

	EXCEPTION 
		WHEN undefined_table THEN  -- if table does not exist...
			NULL;  -- the function will return no rows
		WHEN invalid_schema_name THEN  -- schema does not exist
			NULL;

	END;  -- end block to catch the exception

END LOOP;
		
RETURN;
END;
$BODY$
LANGUAGE plpgsql;



/*
select * from shapes

select * from shapes_read('{}');

*/







DROP FUNCTION IF EXISTS shapes_read_stats2(options JSON);
CREATE FUNCTION shapes_read_stats2(options JSON DEFAULT '[{}]')

RETURNS TABLE(
	value NUMERIC)
AS
$BODY$

DECLARE
	options_row JSON;
	command TEXT;

	function_name TEXT;
	schema_name TEXT;
	table_name TEXT;
	column_name TEXT;

	
	column_type TEXT;
	
	type_is_numeric BOOL;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;

FOR options_row IN ( select json_array_elements(options) ) LOOP

	BEGIN -- begin block to catch exceptions

	SELECT json_extract_path_text(options_row, 'function_name')   INTO function_name;
	SELECT json_extract_path_text(options_row, 'schema_name')   INTO schema_name;
	SELECT json_extract_path_text(options_row, 'table_name')   INTO table_name;
	SELECT json_extract_path_text(options_row, 'column_name')   INTO column_name;

	-- get the data type of the given table/column; if an exception is thrown (which happens
	-- if the table does not exist), the code will jump imeditay to the "exception" section below
	SELECT a.atttypid::regtype::text 
		FROM pg_attribute a
		WHERE a.attrelid = format('%I.%I', schema_name, table_name)::regclass
			AND    a.attname = column_name
			AND    a.attnum > 0
			AND    NOT a.attisdropped
		INTO column_type;

	type_is_numeric := 
		column_type ~* 'int' OR 
		column_type ~* 'decimal' OR 
		column_type ~* 'numeric' OR
		column_type ~* 'double' OR
		column_type ~* 'serial' OR
		column_type ~* 'real';


	IF type_is_numeric IS TRUE OR function_name = 'count' THEN
		command := format('SELECT %s(%s)::numeric FROM %I.%I where %s IS NOT NULL', function_name, column_name, schema_name, table_name, column_name);
		
		--raise notice 'command: %', command;

		RETURN QUERY EXECUTE command;
	END IF;

	EXCEPTION 
		WHEN undefined_table THEN  -- if table does not exist...
			NULL;  -- the function will return no rows
		WHEN invalid_schema_name THEN  -- schema does not exist
			NULL;

	END;  -- end block to catch the exception
	
END LOOP;
RETURN;


END;
$BODY$
LANGUAGE plpgsql;

/*
select * from shapes_read_stats2('{"function_name": "max", "schema_name": "geo",  "table_name": "cirac_vul_cp4_fvi", "column_name": "gid"}');
select * from shapes_read_stats2('{"function_name": "min", "schema_name": "geo",  "table_name": "cirac_vul_cp4_fvi", "column_name": "gid"}');
*/






/*

	2. CREATE

*/



DROP FUNCTION IF EXISTS shapes_create(json, json);

CREATE FUNCTION shapes_create(input_data json, options json DEFAULT '[{}]')
RETURNS SETOF shapes AS
$BODY$
DECLARE
	new_row shapes%ROWTYPE;
	input_row shapes%ROWTYPE;
	current_row shapes%ROWTYPE;
	new_id INT;
	geometry_type TEXT;
	attributes_info_temp JSON;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(input_data) = 'object'::text THEN
	input_data = ('[' || input_data::text ||  ']')::json;
END IF;


FOR input_row IN (select * from json_populate_recordset(null::shapes, input_data)) LOOP

	SELECT input_row.id INTO new_id;

	-- get the geometry_type of the geom column (relative to the postgis table referenced by input_row.table_name)
	SELECT 
		lower(gc.type::TEXT)
	FROM 
		geometry_columns gc
	WHERE
		gc.f_table_schema = format('%I', 'geo') 
		AND gc.f_table_name = format('%I', input_row.table_name)
		AND gc.f_geometry_column = 'geom'
	LIMIT 1
	INTO geometry_type;


	SELECT array_to_json(array_agg(row_to_json(t))) FROM (
		SELECT
			a.attnum AS column_number, 
			lower(a.attname::text) AS column_name,
			lower(a.atttypid::regtype::text) AS data_type,
			(
				select * from shapes_read_stats2(
					format('{"function_name": "max", "schema_name": "%s",  "table_name": "%s", "column_name": "%s"}', 
							'geo'::text, 
							input_row.table_name, 
							a.attname::text
					)::json )
			) as max,
			(
				select * from shapes_read_stats2(
					format('{"function_name": "min", "schema_name": "%s",  "table_name": "%s", "column_name": "%s"}', 
							input_row.schema_name, 
							input_row.table_name, 
							a.attname::text
					)::json )
			) as min,
			(
				select * from shapes_read_stats2(
					format('{"function_name": "count", "schema_name": "%s",  "table_name": "%s", "column_name": "%s"}', 
							input_row.schema_name, 
							input_row.table_name, 
							a.attname::text
					)::json )
			) as count
		FROM 
			pg_attribute a
		WHERE 
			a.attrelid = (input_row.schema_name || '.' || input_row.table_name)::regclass
			AND    a.attnum > 0
			AND    NOT a.attisdropped
		) t
	INTO attributes_info_temp;


	-- we proceed with the insert in 2 cases: 
	--   a) if the id was not given (in which case we retrieve a new id from the sequence); 
	--   b) if the id was given and there is no record with that id

	-- NOTE: if the id has not been given, the data comes from the user interface; otherwise, it comes from the initial data;
	IF new_id IS NULL OR NOT EXISTS (SELECT * FROM shapes WHERE id = new_id) THEN

	
		INSERT INTO shapes(
			id,
			schema_name,
			table_name,
			srid, 
			geometry_type,
			attributes_info,
			description, 
			file_id,
			owner_id,
			inspire
			)
		VALUES (
			COALESCE(new_id, nextval(pg_get_serial_sequence('shapes', 'id'))),
			COALESCE(input_row.schema_name, 'geo'),
			input_row.table_name, 
			COALESCE(input_row.srid, 4326),
			geometry_type, 
			attributes_info_temp::jsonb,
			COALESCE(input_row.description, '{}'::jsonb),
			input_row.file_id,
			input_row.owner_id,
			COALESCE(input_row.inspire, '{}'::jsonb)
			)
		RETURNING 
			*
		INTO STRICT 
			new_row;

		
		RETURN NEXT new_row;

	ELSE
		current_row.id = new_id;
		current_row.table_name = '"WARNING: a row with the given id exists already present. Data will not be inserted."';

		RAISE WARNING 'A row with the given id exists already present. Data will not be inserted (id=%)', current_row.id;

		RETURN NEXT current_row;

	END IF;

END LOOP;

RETURN;
END;
$BODY$
LANGUAGE plpgsql;


/*
select * from shapes order by id desc

select * from shapes_create('{
	"schema_name": "geo"
	"table_name": "precepitacao_ref",
	"description": {"en": "fwefwef fewfw"},
	"owner_id": 2,

}')

*/


/*

	3. UPDATE

*/


DROP FUNCTION IF EXISTS shapes_update(json, json);

CREATE FUNCTION shapes_update(input_data json, options json DEFAULT '[{}]')
RETURNS SETOF shapes AS
$$
DECLARE
	updated_row shapes%ROWTYPE;
	input_row shapes%ROWTYPE;
	command text;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(input_data) = 'object'::text THEN
	input_data = ('[' || input_data::text ||  ']')::json;
END IF;


FOR input_row IN (select * from json_populate_recordset(null::shapes, input_data)) LOOP

	-- generate a dynamic command: first the base query
	command := 'UPDATE shapes SET ';

	-- then add (cumulatively) the fields to be updated; those fields must be present in the input_data json;
	-- IF input_row.schema_name IS NOT NULL THEN
	-- 	command = format(command || 'schema_name = %L, ', input_row.schema_name);
	-- END IF;
	-- IF input_row.table_name IS NOT NULL THEN
	-- 	command = format(command || 'table_name = %L, ', input_row.table_name);
	-- END IF;
	-- IF input_row.srid IS NOT NULL THEN
	-- 	command = format(command || 'srid = %L, ', input_row.srid);
	-- END IF;
	IF input_row.description IS NOT NULL THEN
		command = format(command || 'description = %L, ', input_row.description);
	END IF;
	IF input_row.inspire IS NOT NULL THEN
		command = format(command || 'inspire = %L, ', input_row.inspire);
	END IF;
	-- IF input_row.owner_id IS NOT NULL THEN
	-- 	command = format(command || 'owner_id = %L, ', input_row.owner_id);
	-- END IF;

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
select * from shapes order by id desc

select * from shapes_update('{
	"id": 1001,
	"title": {"pt": "zzzfwefwef", "en": "zzzfwefwef fewfw"},
	"owner_id": 2,
	"schema_name": "geoz"
}')



*/



/*

	4. DELETE

*/


DROP FUNCTION IF EXISTS shapes_delete(json);

CREATE FUNCTION shapes_delete(options json DEFAULT '[{}]')
RETURNS TABLE(deleted_id int) AS
$$
DECLARE
	deleted_row shapes%ROWTYPE;
	options_row JSON;

	-- fields to be used in WHERE clause
	id_to_delete INT;
	geotable_name TEXT;
BEGIN

-- convert the json argument from object to array of (one) objects
IF  json_typeof(options) = 'object'::text THEN
	options = ('[' || options::text ||  ']')::json;
END IF;


FOR options_row IN ( select json_array_elements(options) ) LOOP

	-- extract values to be (optionally) used in the WHERE clause
	SELECT json_extract_path_text(options_row, 'id') INTO id_to_delete;
	
	IF id_to_delete IS NOT NULL THEN

		-- drop the associate table in the geo schema (the name is the table_name)
		SELECT table_name FROM shapes WHERE id = id_to_delete INTO geotable_name;
		EXECUTE 'DROP TABLE geo.' || geotable_name || ';';

		DELETE FROM shapes
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

select * from shapes order by id desc;

select * from shapes_delete('{"id": 1003}');
*/


