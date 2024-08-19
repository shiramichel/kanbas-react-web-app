import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findQuestionsByQuiz } from './client';
import axios from 'axios';
import './QuizStyles.css';

export default function StartQuizScreen({ userRole, userLoginId }) {
    const { cid, quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [attempts, setAttempts] = useState(0);
    const [quizDetails, setQuizDetails] = useState(null);
    const [attemptsAllowed, setAttemptsAllowed] = useState(0);
    const [lastAttempt, setLastAttempt] = useState(null);
    const [canSubmit, setCanSubmit] = useState(true);  // New state to control submit button
    const navigate = useNavigate();

    // Log userLoginId to console to verify that it is being passed correctly
    useEffect(() => {
        console.log("userLoginId:", userLoginId);
    }, [userLoginId]);

    useEffect(() => {
        const fetchQuizData = async () => {
            if (quizId) {
                try {
                    const quiz = await findQuestionsByQuiz(quizId);
                    setQuestions(quiz);
                    setQuizDetails(quiz.quizDetails || {});
                    setAttemptsAllowed(quiz.attemptsAllowed || 0);

                    const scoreResponse = await axios.get(`${process.env.REACT_APP_REMOTE_SERVER}/api/scores/${userLoginId}/quiz/${quizId}`);
                    const scoreData = scoreResponse.data;

                    setAttempts(scoreData?.lastAttempt?.attemptNumber || 0);
                    setLastAttempt(scoreData?.lastAttempt || null);

                    // Check if the student has exhausted the allowed attempts
                    if (scoreData?.lastAttempt?.attemptNumber >= quiz.attemptsAllowed) {
                        setCanSubmit(false);  // Disable the submit button
                    } else {
                        setCanSubmit(true);  // Enable the submit button
                    }

                } catch (error) {
                    console.error("Error fetching quiz or score data:", error);
                }
            }
        };
        fetchQuizData();
    }, [quizId, userLoginId]);

    const handleOptionChange = (questionId, optionId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleSubmitQuiz = async () => {
        try {
            // Calculate the total score based on correct answers
            let totalScore = 0;
            const submissionData = {
                userLoginId,
                quizId,
                answers: Object.keys(answers).map(questionId => {
                    const question = questions.find(q => q._id === questionId);
                    const selectedOption = question.options.find(o => o._id === answers[questionId]);
                    const isCorrect = selectedOption.correct;

                    if (isCorrect) {
                        totalScore += question.points;  // Add the points for correct answer
                    }

                    return {
                        questionId,
                        selectedAnswer: answers[questionId],
                        isCorrect
                    };
                }),
                score: totalScore,  // Include the total score in the submission
            };

            // Submit the quiz data to the server
            const response = await axios.post(`${process.env.REACT_APP_REMOTE_SERVER}/api/scores`, submissionData);
            if (response.data) {
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Results`);
            } else {
                console.error("Quiz submission failed.");
            }
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    return (
        <div className="quiz-container">
            <h1>{quizDetails?.title}</h1>
            <p className="quiz-instructions">Quiz Instructions</p>

            {questions.length > 0 ? (
                questions.map((question, index) => (
                    <div key={question._id} className="question-box">
                        <h3>Question {index + 1}</h3>
                        <p><b>Points:</b> {question.points}</p>
                        <p>{question.question}</p>
                        <div className="options-container">
                            {question.options.map(option => (
                                <label key={option._id} className="option-label">
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option._id}
                                        onChange={() => handleOptionChange(question._id, option._id)}
                                        checked={answers[question._id] === option._id}
                                    />
                                    {option.value}
                                </label>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No questions available.</p>
            )}

            <div className="quiz-footer">
                <button className="submit-quiz-btn" onClick={handleSubmitQuiz} disabled={!canSubmit}>Submit Quiz</button>
                <button className="submit-quiz-btn-g" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Results`)}>View Last Attempt</button>
            </div>
        </div>
    );
}
