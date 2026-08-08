export interface Question {
  id: string;
  userId: string;
  userNama: string;
  pertanyaan: string;
  jawaban: string | null;
  status: "pending" | "dijawab";
  createdAt: string;
}

export async function getAllQuestions(): Promise<Question[]> {
  const res = await fetch("/api/question");

  if (!res.ok) return [];

  return res.json();
}

export async function getQuestionsForUser(
  userId: string
): Promise<Question[]> {

  const all = await getAllQuestions();

  return all.filter(
    (q) => String(q.userId) === String(userId)
  );

}

export async function askQuestion(
  userId: string,
  userNama: string,
  pertanyaan: string
) {

  await fetch("/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: Number(userId),
      userNama,
      pertanyaan,
    }),
  });

}

export async function answerQuestion(
  id: string,
  jawaban: string
) {

  await fetch(`/api/question/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jawaban,
    }),
  });

}

export async function removeQuestion(
  id: string
) {

  await fetch(`/api/question/${id}`, {
    method: "DELETE",
  });

}