export const getServices = async () => {
  const data = await fetch(`${import.meta.env.VITE_SERVER_URL}/services`);
  const result = await data.json();
  return result;
};
