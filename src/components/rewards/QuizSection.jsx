import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useFireworks } from '@/contexts/FireworksContext';
import { CheckCircle, XCircle, Award, Gift, FileText } from 'lucide-react';

const quizData = {
  easy: {
    points: 10,
    questions: [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language"], answer: "Hyper Text Markup Language" },
      { question: "Which property is used to change the background color in CSS?", options: ["color", "background-color", "bgcolor"], answer: "background-color" },
    ]
  },
  medium: {
    points: 50,
    rewards: ['certificate'],
    questions: [
      { question: "What is a closure in JavaScript?", options: ["A function having access to the parent scope", "A way to close a browser window", "A type of loop"], answer: "A function having access to the parent scope" },
      { question: "What is the purpose of the `key` prop in React?", options: ["To unlock features", "To identify which items have changed", "To set the primary key of a component"], answer: "To identify which items have changed" },
    ]
  },
  hard: {
    points: 100,
    rewards: ['certificate', 'merch'],
    questions: [
      { question: "What is the difference between `useEffect` and `useLayoutEffect`?", options: ["No difference", "`useLayoutEffect` runs synchronously after all DOM mutations", "`useEffect` is faster"], answer: "`useLayoutEffect` runs synchronously after all DOM mutations" },
      { question: "What is memoization in the context of React?", options: ["A way to remember component state", "An optimization technique to cache results", "A method for memory management"], answer: "An optimization technique to cache results" },
    ]
  }
};

const QuizSection = ({ difficulty, setQuizStarted }) => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const { fire } = useFireworks();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quiz = quizData[difficulty];
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const pointsWon = Math.round((score / quiz.questions.length) * quiz.points);
      updateUser({ points: (user.points || 0) + pointsWon });
      toast({ title: `🎉 Quiz Finished! +${pointsWon} Points!`, description: "Great job testing your knowledge!" });
      fire();
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    const successRate = (score / quiz.questions.length) * 100;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="feature-card text-center">
          <CardHeader><CardTitle className="text-white">Quiz Results</CardTitle></CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold text-white mb-4">You scored {score} out of {quiz.questions.length}!</h2>
            {successRate >= 75 && (
              <div className="space-y-4">
                <p className="text-green-400 font-semibold">Excellent work! You've earned the following rewards:</p>
                <div className="flex justify-center gap-4">
                  <div className="flex items-center gap-2"><Award className="text-yellow-400" /><span>{quiz.points} Points</span></div>
                  {quiz.rewards?.includes('certificate') && <div className="flex items-center gap-2"><FileText className="text-blue-400" /><span>Certificate</span></div>}
                  {quiz.rewards?.includes('merch') && <div className="flex items-center gap-2"><Gift className="text-pink-400" /><span>Merchandise</span></div>}
                </div>
              </div>
            )}
            <Button onClick={() => setQuizStarted(false)} className="mt-6">Back to Rewards</Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white capitalize">{difficulty} Quiz - Question {currentQuestionIndex + 1}/{quiz.questions.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-white/90 mb-6">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.answer;
              let buttonClass = "justify-start text-left h-auto py-3";
              if (isSelected) {
                buttonClass += isCorrect ? " bg-green-500/50 border-green-500" : " bg-red-500/50 border-red-500";
              }
              return (
                <Button key={index} variant="outline" className={buttonClass} onClick={() => handleAnswer(option)} disabled={selectedAnswer !== null}>
                  {selectedAnswer && (isCorrect ? <CheckCircle className="mr-2 text-green-400" /> : isSelected && <XCircle className="mr-2 text-red-400" />)}
                  {option}
                </Button>
              );
            })}
          </div>
          {selectedAnswer && <Button onClick={handleNext} className="mt-6 w-full">Next</Button>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizSection;