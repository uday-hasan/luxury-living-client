export const getUserByEmail = async (email: string | null | undefined) => {
  try {
    if (email) {
      const res = await fetch(
        `https://luxury-living-server-o99b.onrender.com/users/${email}`
      );
      const result = await res.json();
      console.log(result);

      //   return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
