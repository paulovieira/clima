#### whenever we are reading stuff in the middle of a promise chain, verify if we can move that into a pre-requisite method (if the reading fails, it will be more easy to catch)

#### after an update, migrate data from old database to a new one

Do this one a table by table basis?

#### ao fazer delete do projecto, aconteceu um erro no servidor

#### paletes: acrescentar uma nova tab:
  -escolher shape
  -escolher campo (dizer o tipo de dados: inteiro ou real)
    (é apresentado o max e min, mas o utilizador pode mudar)
  -escolher a palete
  -escolher o nº classes

  -verificar o tipo de dados: inteiro ou real



#### escolher os bounds por omissao: portugal, madeira, acores

No dashboard, ao criar um novo mapa, adicionar uma opcao para se poder escolher os bounds



#### alteracoes no tilemill
  -mudar "Projects" para "All maps" (no menu principal)
  -tirar o botao de novo projecto e de adicionar layers via upload de shape
  -antes de exportar para mbtiles, por uma mensagem a avisar que é necessário tirar o layer dos countries

#### no shp2pgsql, garantir que as colunas ficam sem espacos

  -para garantir que as colunas ficam sem espacos, depois da execucao do shp2pgsql deviamos fazer um query para ver os nomes das colunas; se tiverem espacos, mudavamos o nome:
    
    ALTER TABLE table_name RENAME COLUMN column_name TO column_name_new;
    http://www.postgresql.org/docs/8.1/static/ddl-alter.html

    1) GET /api/shapes
    2) ver as colunas que têm espaços; concatenar o comando directamente num string;
    3) executaro o comando directamente



#### no shp2pgsql, é possivel fazer a reprojeccao do shape 

  isto vai permitir fazer upload de shapes noutras projeccoes. É a opcao "-s 9876:4326" (no entanto nao se pode usar com a opcao "-D"


#### config table: the key should be the same for every option; 





#### add auth

(?solved)
We can access this uri without authentication
http://clima.dev/pt/tilemill#/project/energia-centrais-termoelectricas


#### redo the "new file" uesr interface

The user uploads the zip file with shapes, but forgets to check the option in the select element. It be more robust to have a third tab "New shape file upload", which would be just like the other, but with the "file is shape" pre-selected

#### after a resource is created with POST, we should return the status 201 with the "location" header






## DONE

#### /api/shapes have authentication disabled

When calling /api/shapes internally (to create a shape after the file upload), we are not sending the authentication headers when making the request with Wreck. This means the /api/shapes endpoints need to auth: false.
