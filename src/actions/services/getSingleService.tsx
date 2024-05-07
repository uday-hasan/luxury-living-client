export async function getSingleService(_id: string) {
  const res = await fetch(
    `https://luxury-living-server-o99b.onrender.com/services/${_id}`
  );
  const data = await res.json();
  return data;
}
