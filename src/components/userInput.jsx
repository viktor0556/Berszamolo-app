export const userInput = (index) => {
  const query = prompt(`Hány órát dolgoztál a (z) ${index + 1} napon?: `);
  return parseFloat(query); 
};