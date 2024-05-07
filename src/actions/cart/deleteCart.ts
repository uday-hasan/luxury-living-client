async function Delete(
  productId: string | undefined,
  userId: string | undefined
) {
  const response = await fetch(
    `https://luxury-living-server-o99b.onrender.com/order/${userId}/${productId}`,
    {
      method: "DELETE",
    }
  );
  const result = await response.json();
  return { result };
}

export default Delete;
