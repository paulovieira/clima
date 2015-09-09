 - all pages have a "name" (string, which is the url path)
 - all texts that are editable have an "editable id" (string), which is local to the page
 - example of ids: e1, e2, e3
 - the combination (name, editableId) must be unique

TODO: add 2 new columns to the text columns, add a constraint to make them unique

- instead of using includes, use macros (and pass the page name??); the same macro can be used in 2 different pages, since the page name is different
- the editable ids in the macros should have some prefix, to help reduce name clash with editable ids from the pages where those macros are called: 
- example: my-macro-1, my-macro-2

when creating the html:

    -get the array of texts
    -filter by page 
    -transform from array to object, using the "editableId" key as the key of the object

    - <div data-e-id="e1"> {{ ctx.texts["e1"][lang] | default }} </div>

    or maybe something link (because the text might not exist yet in the database)

    - <div data-e-id="e1"> 
        {% if ctx.texts["e1"] %}
            {{ ctx.texts["e1"][lang] }} 
        {% else %}
            {{ someDefaultText }}
        {% endif %}
    </div>

    NOTE: data-e-id is fixed, once and for all
    NOTE: ctx.texts["e1"] will return the text object

    - <div>{{ my_macro(ctx) }}</div>

            <span data-e-id="my-macro-1"> {{ ctx.texts["my-macro-e1"] | default }} </span>


    NOTE: if the text doesn't exist yet, we get undefinedthe default will be used;


when sending changes to the server

    -get the editable id
    -get the pathname: window.location.pathname
    -remove the lang component
    -in the ajax call, send the editable id and pathname
    -if it doesn't exist, create

    



create a new text:
    - if the page_name is not given, use the value from the serial (dummy_page_46)
    - same for editable_id (dummy_editable_46)

NOTE: we could implement a custom filter like to:

https://mozilla.github.io/nunjucks/api#custom-filters
env.addFilter('getText', function(texts, pageName, editableId) {

    // 1. find the text object from the combination of (pageName, editableId)
    // 2. if found, return the contents object in the lang
    // 3. if not, return undefined
    // 4. the lorem filter will act only if the input if undefined

    return str.slice(0, count || 5);
});

{{ ctx | find('page_x', 'e1', 'pt') | lorem(10) }}
