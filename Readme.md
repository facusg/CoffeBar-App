
## Quick guide
## Endpoints

### Authentication
 * POST /api/auth/login
 * POST google signin /api/auth/google

### Busqueda General 
* GET /api/buscar/ 
   --------------------------------
   * GET /api/buscar/usuarios/id
   * GET /api/buscar/usuarios/nombre
   * GET /api/buscar/usuarios/email
   * GET /api/buscar/usuarios/estado
   --------------------------------
   * GET /api/buscar/categorias/id
   * GET /api/buscar/categorias/nombre
   * GET /api/buscar/categorias/estado
   --------------------------------
   * GET /api/buscar/productos/id
   * GET /api/buscar/productos/nombre
   * GET /api/buscar/productos/estado
   
 ### Usuarios 
* GET /api/usuarios 
  * GET/api/usuarios?limite
  * GET/api/usuarios?desde
* POST api/usuarios
* PUT /api/usuarios/:id
* DELETE /api/usuarios/:id
        
### Categorias 
* GET /api/categorias 
  * GET/api/categorias?limite
  * GET/api/categorias?desde
* GET /api/categorias/:id
* POST api/categorias
* PUT /api/categorias/:id
* DELETE /api/categorias/:id

### Productos  
* GET /api/productos 
  * GET/api/productos?limite
  * GET/api/productos?desde
* GET /api/prodcutos/:id
* POST api/productos
* PUT /api/productos/:id
* DELETE /api/productos/:id

### Subir foto Usuario o Categoria
* POST /api/uploads/
* PUT /api/uploads/productos/id
* PUT /api/uploads/categoria/id



        
