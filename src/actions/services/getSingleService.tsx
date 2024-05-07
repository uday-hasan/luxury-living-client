export async function getSingleService(_id: string) {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/services/${_id}`);
  const data = await res.json();
  return data;
}
