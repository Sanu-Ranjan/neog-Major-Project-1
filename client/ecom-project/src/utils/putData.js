export const putData = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
