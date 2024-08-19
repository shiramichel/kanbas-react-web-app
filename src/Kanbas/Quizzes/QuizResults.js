///Users/phoebelin/2024/summer/webdev/kanbas-react-web-app/src/Kanbas/Courses/Quizzes/QuizResults.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLastAttemptByQuizAndUser } from './client'; // Import the function from client.js
import './QuizResultsStyles.css';

export default function QuizResultsScreen({ userRole, userLoginId }) {
    const { cid, quizId } = useParams();
    const [lastAttempt, setLastAttempt] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLastAttempt = async () => {
            try {
                const data = await fetchLastAttemptByQuizAndUser(userLoginId, quizId);
                setLastAttempt(data);
            } catch (error) {
                console.error("Error fetching last attempt data:", error);
            }
        };

        fetchLastAttempt();
    }, [quizId, userLoginId]);

    const navigateToResults = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Results`);
    };

    return (
        <div className="quiz-results-container">
            {lastAttempt ? (
                <div>
                    <h1>Quiz Results</h1>
                    <p><b>Date Taken:</b> {new Date(lastAttempt.dateTaken).toLocaleDateString()}</p>
                    <p><b>Score:</b> {lastAttempt.score}</p>

                    {lastAttempt.answers.map((answer, index) => (
                        <div key={index} className="question-result">
                            <p><b>Question {index + 1}:</b> {answer.questionId.question}</p>
                            <p><b>Your Answer: True</b> </p>
                            <p className={answer.isCorrect ? "correct-answer" : "incorrect-answer"}>
                                {answer.isCorrect ? '✔ Correct' : '✘ Incorrect'}
                            </p>
                        </div>
                    ))}

                
                </div>
            ) : (
                <p>No attempt data found.</p>
            )}
        </div>
    );
}
