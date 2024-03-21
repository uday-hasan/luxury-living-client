export async function getSingleService(_id: string) {
  const res = await fetch(`http://localhost:5000/services/${_id}`);
  const data = await res.json();
  return data;
}
