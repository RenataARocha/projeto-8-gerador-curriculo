export const melhorarTexto = async (texto: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/melhorar-texto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });
    const data = await res.json();
    return data.resultado;
  } catch (error) {
    console.error(error);
    return texto; // fallback: retorna texto original
  }
};
