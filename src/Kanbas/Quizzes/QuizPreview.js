import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findQuestionsByQuiz } from './client';

export default function QuizPreviewScreen({ userRole }) {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await findQuestionsByQuiz(quizId);
            setQuestions(data);
        };
        fetchQuestions();
    }, [quizId]);

    return (
        <div>
            <h1>Quiz Questions</h1>
            <ul>
                {questions.map((question) => (
                    <li key={question._id}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}
