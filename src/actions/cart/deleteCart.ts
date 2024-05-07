async function Delete(
  productId: string | undefined,
  userId: string | undefined
) {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/order/${userId}/${productId}`,
    {
      method: "DELETE",
    }
  );
  const result = await response.json();
  return { result };
}

export default Delete;
