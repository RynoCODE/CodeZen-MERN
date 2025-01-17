import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuestionList = () => {
  const [questionList, setQuestionList] = useState([]);

  async function getQuestions() {
    try {
      const response = await fetch("http://localhost:3000/fetchall");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const questions = await response.json();
      setQuestionList(questions);
      console.log(questions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Question List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border border-gray-600">S.No</th>
              <th className="px-4 py-2 border border-gray-600">Status</th>
              <th className="px-4 py-2 border border-gray-600">Title</th>
              <th className="px-4 py-2 border border-gray-600">Acceptance</th>
              <th className="px-4 py-2 border border-gray-600">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {questionList.map((question, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } hover:bg-gray-300`}
              >
                <td className="px-4 py-2 border border-gray-600 text-center">
                  {question.question_id}
                </td>
                <td className="px-4 py-2 border border-gray-600 text-center">
                  {/* {question.status === "Completed" ? (
                    <span className="text-green-600">✔</span>
                  ) : (
                    <span className="text-gray-600">❌</span>
                  )} */}{" "}
                  ❌
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <Link
                    to={`/question/${question.question_id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {question.question}
                  </Link>
                </td>
                <td className="px-4 py-2 border border-gray-600 text-center">
                  {/* {question.acceptance} */} Not applied
                </td>
                <td className={`px-4 py-2 border border-gray-600 text-center `}>
                  {/* {question.difficulty} */} hard
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionList;
