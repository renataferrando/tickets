/* eslint-disable */

export const editUser = async (body: any, id: any) => {

  try {
    const res = await fetch("http://localhost:3001/api/users/" + id, {
      method: "PATCH",
      body: JSON.stringify(body),

    });
    console.log(res)
  } catch (err) {
    console.error(err);
  }
};
