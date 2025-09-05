'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Question, getRandomQuestions } from '@/lib/questions';
import { Results } from '@/components/Results';

interface QuizProps {
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  questionCount: number;
  onExit: () => void;
}

interface UserAnswer {
  questionId: string;
  answer: string;
  timeSpent: number;
}

export function Quiz({ difficulty, questionCount, onExit }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    const quizQuestions = getRandomQuestions(questionCount, difficulty);
    setQuestions(quizQuestions);
    setStartTime(Date.now());
  }, [difficulty, questionCount]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleNextQuestion = () => {
    if (!currentQuestion) return;

    const timeSpent = Date.now() - startTime;
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer.trim(),
      timeSpent
    };

    const newAnswers = [...userAnswers, userAnswer];
    setUserAnswers(newAnswers);
    setCurrentAnswer('');

    if (currentQuestionIndex + 1 >= questions.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now());
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTopicLabel = (topic: string) => {
    const labels: Record<string, string> = {
      'finite-automata': 'Finite Automata',
      'regular-languages': 'Regular Languages',
      'cfg': 'Context-Free Grammars',
      'pda': 'Pushdown Automata',
      'turing-machines': 'Turing Machines',
      'complexity': 'Complexity Theory'
    };
    return labels[topic] || topic;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">Loading quiz questions...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <Results 
        questions={questions}
        userAnswers={userAnswers}
        onRestart={() => {
          setQuizCompleted(false);
          setCurrentQuestionIndex(0);
          setUserAnswers([]);
          setCurrentAnswer('');
          const quizQuestions = getRandomQuestions(questionCount, difficulty);
          setQuestions(quizQuestions);
          setStartTime(Date.now());
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onExit}>
              Exit Quiz
            </Button>
            <div className="text-sm text-slate-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {difficulty && (
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0%</span>
            <span>{Math.round(progress)}% Complete</span>
            <span>100%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {getTopicLabel(currentQuestion.topic)}
                  </Badge>
                  <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                    {currentQuestion.difficulty}
                  </Badge>
                  <Badge variant="secondary">
                    {currentQuestion.points} pts
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Answer:
              </label>
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here... Be specific and detailed."
                className="min-h-[200px] text-base leading-relaxed"
                autoFocus
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-slate-500">
                {currentAnswer.length > 0 ? (
                  `${currentAnswer.length} characters`
                ) : (
                  'Start typing your answer...'
                )}
              </div>
              <Button 
                onClick={handleNextQuestion}
                disabled={currentAnswer.trim().length === 0}
                size="lg"
              >
                {currentQuestionIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-sm text-blue-800">
              <strong>Tips:</strong> Write complete, detailed answers. Include formal definitions where appropriate. 
              You can use mathematical notation. Take your time to think through each answer carefully.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}