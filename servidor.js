const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const {
  getUsuarios,
  getTransferencias,
  crearTransferencia,
  actualizarUsuario,
  eliminarUsuario,
  crearUsuario,
} = require("./consultas");

app.use(cors());
app.use(express.json());

// Sirviendo archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

app.post("/usuario", async (req, res) => {
  const { nombre, balance } = req.body;
  try {
    const nuevoUsuario = await crearUsuario(nombre, balance);
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

app.put("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, balance } = req.body;
  try {
    const usuarioActualizado = await actualizarUsuario(id, nombre, balance);
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

app.delete("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarUsuario(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

app.post("/transferencia", async (req, res) => {
  const { emisor, receptor, monto } = req.body;
  try {
    const transferencia = await crearTransferencia(emisor, receptor, monto);
    res.json(transferencia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la transferencia" });
  }
});

app.get("/transferencias", async (req, res) => {
  try {
    const transferencias = await getTransferencias();
    res.json(transferencias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las transferencias" });
  }
});

app.listen(3000, () => {
  console.log("Servidor http://localhost:3000");
});
