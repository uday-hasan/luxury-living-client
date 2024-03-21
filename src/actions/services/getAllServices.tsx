export const getServices = async () => {
  const data = await fetch(`http://localhost:5000/services`);
  const result = await data.json();
  return result;
};
