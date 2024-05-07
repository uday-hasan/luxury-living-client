export const getServices = async () => {
  const data = await fetch(
    `https://luxury-living-server-o99b.onrender.com/services`
  );
  const result = await data.json();
  return result;
};
