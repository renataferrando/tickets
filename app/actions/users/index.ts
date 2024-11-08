export const editUser = async (body, id) => {

  try {
    const res = await fetch("http://localhost:3001/api/users/" + id, {
      method: "PATCH",
      body: JSON.stringify(body),

    });
  } catch (err) {
    console.error(err);
  }
};
