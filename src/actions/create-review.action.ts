"use server";

export async function createReviewAction(formData: FormData) {
  console.log("server action called");
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const movieId = formData.get("movieId")?.toString();
  if (!movieId || !content || !author) {
    return;
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    console.log(response.status);
  } catch (err) {
    console.error(err);
    return;
  }
}
