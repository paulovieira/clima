
CREATE TABLE IF NOT EXISTS shapes( 
	id SERIAL PRIMARY KEY,
	schema_name TEXT NOT NULL default 'geo',
	table_name TEXT NOT NULL UNIQUE,  -- the name of the file and the name of the shape might be slightly different
	srid INT REFERENCES spatial_ref_sys(srid) default 4326,
	geometry_type TEXT NOT NULL,
	attributes_info JSONB default '[]',
	description JSONB default '{}',
	inspire JSONB default '{}',
	file_id INT references files(id)  on update cascade on delete set null,
	owner_id INT REFERENCES users(id) ON DELETE SET NULL,
	created_at timestamptz not null default now(),
	CONSTRAINT description_must_be_object CHECK (jsonb_typeof(description) = 'object')
);

-- change 15.07.13: add json column for the inspire metadata
-- DO $$
-- DECLARE
--     dummy INT;
-- BEGIN
--     BEGIN
--         ALTER TABLE shapes ADD COLUMN inspire JSONB default '{}';
--     EXCEPTION
--         WHEN duplicate_column THEN RAISE NOTICE 'column "inspire" already exists in "shapes", skipping';
--     END;
-- END;
-- $$;


DO $$
DECLARE
	_has_executed BOOLEAN;
	_table_exists BOOLEAN;
	_flag TEXT := 'create_table_shapes';
	_table_name TEXT := 'shapes';
BEGIN

	-- get the flag for this file
	SELECT EXISTS (
		SELECT 1 FROM code_has_executed WHERE code = _flag
	) INTO _has_executed;

	-- check if the table exists
	SELECT EXISTS (
	   SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = _table_name
	) INTO _table_exists;

	if _table_exists is true AND _has_executed is false then

		-- the following sql lines will be executed only the first time this file is run
		PERFORM setval(pg_get_serial_sequence('shapes', 'id'), 1000);
		PERFORM audit.audit_table('shapes');

		-- add the flag to the table
		INSERT INTO code_has_executed(code) VALUES(_flag);
	end if;
END
$$;

