'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Question, getTotalPoints } from '@/lib/questions';

interface UserAnswer {
  questionId: string;
  answer: string;
  timeSpent: number;
}

interface ResultsProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
  onExit: () => void;
}

export function Results({ questions, userAnswers, onRestart, onExit }: ResultsProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const totalPoints = getTotalPoints(questions);
  const totalTime = userAnswers.reduce((sum, answer) => sum + answer.timeSpent, 0);
  const averageTimePerQuestion = totalTime / userAnswers.length;

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const getTopicStats = () => {
    const stats: Record<string, { count: number; totalPoints: number }> = {};
    
    questions.forEach(q => {
      if (!stats[q.topic]) {
        stats[q.topic] = { count: 0, totalPoints: 0 };
      }
      stats[q.topic].count++;
      stats[q.topic].totalPoints += q.points;
    });

    return Object.entries(stats).map(([topic, data]) => ({
      topic: getTopicLabel(topic),
      count: data.count,
      totalPoints: data.totalPoints
    }));
  };

  const getDifficultyStats = () => {
    const stats: Record<string, { count: number; totalPoints: number }> = {};
    
    questions.forEach(q => {
      if (!stats[q.difficulty]) {
        stats[q.difficulty] = { count: 0, totalPoints: 0 };
      }
      stats[q.difficulty].count++;
      stats[q.difficulty].totalPoints += q.points;
    });

    return Object.entries(stats).map(([difficulty, data]) => ({
      difficulty,
      count: data.count,
      totalPoints: data.totalPoints
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Quiz Complete!</h1>
            <p className="text-slate-600 mt-1">Review your answers and the correct solutions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onRestart}>
              Retake Quiz
            </Button>
            <Button onClick={onExit}>
              Back to Home
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{questions.length}</div>
              <div className="text-sm text-slate-600">Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{totalPoints}</div>
              <div className="text-sm text-slate-600">Total Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{formatTime(totalTime)}</div>
              <div className="text-sm text-slate-600">Total Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{formatTime(averageTimePerQuestion)}</div>
              <div className="text-sm text-slate-600">Avg per Question</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questions">Question Review</TabsTrigger>
            <TabsTrigger value="topics">By Topic</TabsTrigger>
            <TabsTrigger value="difficulty">By Difficulty</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <div className="grid gap-4">
              {questions.map((question, index) => {
                const userAnswer = userAnswers.find(a => a.questionId === question.id);
                const isExpanded = selectedQuestion === question.id;

                return (
                  <Card key={question.id} className="overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => setSelectedQuestion(isExpanded ? null : question.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Q{index + 1}</Badge>
                            <Badge variant="outline">
                              {getTopicLabel(question.topic)}
                            </Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="secondary">
                              {question.points} pts
                            </Badge>
                          </div>
                          <CardTitle className="text-lg leading-relaxed">
                            {question.question}
                          </CardTitle>
                        </div>
                        <div className="text-right text-sm text-slate-500">
                          {userAnswer && formatTime(userAnswer.timeSpent)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {isExpanded && (
                      <CardContent className="pt-0">
                        <Separator className="mb-6" />
                        
                        <div className="space-y-6">
                          {/* User Answer */}
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Your Answer:</h4>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {userAnswer?.answer || 'No answer provided'}
                              </div>
                            </div>
                          </div>

                          {/* Correct Answer */}
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Correct Answer:</h4>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {question.answer}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4">
            <div className="grid gap-4">
              {getTopicStats().map((stat) => (
                <Card key={stat.topic}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{stat.topic}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{stat.count} questions</Badge>
                        <Badge variant="secondary">{stat.totalPoints} points</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {questions
                        .filter(q => getTopicLabel(q.topic) === stat.topic)
                        .map((q, idx) => (
                          <div key={q.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 flex-1">
                              Q{questions.indexOf(q) + 1}: {q.question.slice(0, 80)}
                              {q.question.length > 80 ? '...' : ''}
                            </span>
                            <Badge className={getDifficultyColor(q.difficulty)} variant="secondary">
                              {q.difficulty}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="difficulty" className="space-y-4">
            <div className="grid gap-4">
              {getDifficultyStats().map((stat) => (
                <Card key={stat.difficulty}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{stat.difficulty} Level</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{stat.count} questions</Badge>
                        <Badge variant="secondary">{stat.totalPoints} points</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {questions
                        .filter(q => q.difficulty === stat.difficulty)
                        .map((q) => (
                          <div key={q.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 flex-1">
                              Q{questions.indexOf(q) + 1}: {q.question.slice(0, 80)}
                              {q.question.length > 80 ? '...' : ''}
                            </span>
                            <Badge variant="outline">
                              {getTopicLabel(q.topic)}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}