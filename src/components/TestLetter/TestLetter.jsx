import React from 'react'
import './TestLetter.css';
const TestLetter = ({ individualInfoLetter }) => {
    const { status } = individualInfoLetter;

    const statusClass = {
        correct: "test-letter-correct",
        incorrect: "test-letter-incorrect",
        notAttempted: "test-letter-notAttempted"
    }[status];


    return (
        <span className={`test-letter ${statusClass}`}>{individualInfoLetter.testLetter}</span>
    )
}

export default TestLetter;
