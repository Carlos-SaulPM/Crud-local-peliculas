const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const peliculas = [];
let idPeliculas = 1; //Simulando id incrementable

//Muestra el index
app.get("/", (req, res) => {
  // console.log(peliculas);
  res.render("index", { peliculas });
});

//Muestra el formulario agregar pelicula
app.get("/agregar", (req, res) => {
  res.render("agregar");
});

//Ruta para agregar pelicula
app.post("/pelicula/crear", (req, res) => {
  let titulo = req.body.titulo;
  let fecha = req.body.fecha;
  let sinopsis = req.body.sinopsis;

  
  peliculas.push({
    id: idPeliculas,
    titulo,
    fecha,
    sinopsis,
    visto: false,
  });

  idPeliculas++;
  
  res.redirect("/");
});

//Muestra el formulario para editar la pelicula
app.get("/pelicula/editar/:id", (req, res) => {
  let id = req.params.id;
  let pelicula = obtenerPeliculaPorId(id);
  res.render("editar", {pelicula});
});

//Ruta para editar pelicula
app.post("/pelicula/editar", (req, res) => {
  let pelicula = {
    id: req.body.id,
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    sinopsis: req.body.sinopsis,
  };
  
  editarPelicula(pelicula);
  res.redirect("/")
});

//Ruta para eliminar la pelicula
app.get("/pelicula/eliminar/:id", (req, res) => {
  let id = req.params.id;
  eliminarPeliculaPorId(id);
  res.redirect("/");
})


// RUTAS PARA PROBAR CON POSTMAN

//Obtener peliculas
app.get("/api/peliculas", (req, res) => {
  if (peliculas.length <= 0)
    return res.status(200).json({ mensaje: "Actualmente no hay películas" });
  res.status(200).json({ peliculas });
})

//Obtener película por Id
app.get("/api/pelicula/:id", (req, res) => {
  
  const id = req.params.id;

  const pelicula = obtenerPeliculaPorId(id);
  if (pelicula == null) return res.status(404).json({mensaje: "No existe esa pelicula por ese id"});

  res.status(200).json({ pelicula });
})

//Editar pelicula por Id
app.post("/api/pelicula/modificar/:id", (req, res) => {
  const id = req.params.id;
  const pelicula = obtenerPeliculaPorId(id);
  if (pelicula == null)return res.status(404).json({ mensaje: "No existe esa pelicula con ese id" });
  
  pelicula.titulo = req.body.titulo;
  pelicula.sinopsis = req.body.sinopsis;
  pelicula.fecha = req.body.fecha;
  pelicula.visto = req.body.visto

  res.status(200).json({ pelicula });
})

app.post("/api/pelicula/crear", (req, res) => {
  
  let titulo = req.body.titulo;
  let fecha = req.body.fecha;
  let sinopsis = req.body.sinopsis;

  const peliculaAAgregar = {
    id: idPeliculas,
    titulo,
    fecha,
    sinopsis,
    visto: false,
  };

  peliculas.push(peliculaAAgregar);
  idPeliculas++;

  res.status(200).json({peliculaAAgregar});

})

app.get("/pelicula/eliminar/:id", (req, res) => {
  let id = req.params.id;
  eliminarPeliculaPorId(id);
  res.status(200).json({peliculas});
});



//Funciones auxiliares
function obtenerPeliculaPorId(id) {
  return peliculas.find((pelicula) => pelicula.id === Number(id));
}

function editarPelicula(peliculaConCambios) {
  let peliculaAActualizar = obtenerPeliculaPorId(peliculaConCambios.id);
  peliculaAActualizar.titulo = peliculaConCambios.titulo;
  peliculaAActualizar.fecha= peliculaConCambios.fecha;
  peliculaAActualizar.sinopsis = peliculaConCambios.sinopsis;
}

function eliminarPeliculaPorId(id) {
  let indicePeliculaAEliminar = peliculas.findIndex((pelicula) => pelicula.id === Number(id));
  peliculas.splice(indicePeliculaAEliminar, 1);
}

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
