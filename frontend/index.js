// async function getExplanation() {
//   const input = document.getElementById("questionInput").value;
//   const output = document.getElementById("output");
//   output.innerText = "Loading...";

//   try {
//     const response = await fetch("http://localhost:3000/api", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ prompt: input })
//     });

//     if (!response.ok) throw new Error("Network response was not ok");

//     const data = await response.json();
//     output.innerText = data.answer || "No response received.";
//   } catch (error) {
//     output.innerText = "Error: " + error.message;
//     console.error(error);
//   }
// }









async function getExplanation() {
  const input = document.getElementById("questionInput").value.trim();
  const output = document.getElementById("output");

  if (!input) return;

  output.innerText = "Loading...";

  try {
    const response = await fetch("https://new-ai-question-explanation.vercel.app/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    output.innerText = data.answer || "No response received.";

    saveQuestion(input); // Save question to localStorage
  } catch (error) {
    output.innerText = "Error: " + error.message;
    console.error(error);
  }
}

function saveQuestion(question) {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  if (!questions.includes(question)) {
    questions.push(question);
    localStorage.setItem("questions", JSON.stringify(questions));
  }
}
