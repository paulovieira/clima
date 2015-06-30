#### add auth

We can access this uri without authentication
http://clima.dev/pt/tilemill#/project/energia-centrais-termoelectricas


#### /api/shapes have authentication disabled

When calling /api/shapes internally (to create a shape after the file upload), we are not sending the authentication headers when making the request with Wreck. This means the /api/shapes endpoints need to auth: false.

#### redo the "new file" uesr interface

The user uploads the zip file with shapes, but forgets to check the option in the select element. It be more robust to have a third tab "New shape file upload", which would be just like the other, but with the "file is shape" pre-selected


