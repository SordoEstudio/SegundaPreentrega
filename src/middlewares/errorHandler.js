/* export const errorHandler = (error, req, res, next) => {
  console.log(`error ${error.message}`);
  const status = error.status || 400;
  res.status(status).send(error.message);
};
 */
//Version de Gpt

export const errorHandler = (error, req, res, next) => {
  // Log completo del error para depuración
  console.error(`Error: ${error.message}\nStack: ${error.stack}`);
  
  // Establece un estado predeterminado para los errores no esperados
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  
  // Envía la respuesta con el estado y el mensaje del error
  res.status(status).json({
    status: status,
    message: message,
  });
};