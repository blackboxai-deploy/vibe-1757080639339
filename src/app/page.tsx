'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/Quiz';

export default function HomePage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'basic' | 'intermediate' | 'advanced' | undefined>();
  const questionCount = 20;

  const handleStartQuiz = (difficulty?: 'basic' | 'intermediate' | 'advanced') => {
    setSelectedDifficulty(difficulty);
    setQuizStarted(true);
  };

  if (quizStarted) {
    return (
      <Quiz 
        difficulty={selectedDifficulty}
        questionCount={questionCount}
        onExit={() => setQuizStarted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Automata Theory Quiz
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Test your knowledge with active recall questions covering finite automata, 
            regular languages, context-free grammars, and computational complexity.
          </p>
        </div>

        {/* Quiz Options */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                onClick={() => handleStartQuiz()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Mixed Difficulty
                <Badge variant="outline">All Topics</Badge>
              </CardTitle>
              <CardDescription>
                Randomized questions across all difficulty levels and topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div>• 20 questions total</div>
                <div>• Basic to advanced level</div>
                <div>• Comprehensive coverage</div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200"
                onClick={() => handleStartQuiz('basic')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Basic Level
                <Badge variant="secondary" className="bg-green-100 text-green-800">Beginner</Badge>
              </CardTitle>
              <CardDescription>
                Fundamental definitions and core concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div>• Definition recall</div>
                <div>• Basic explanations</div>
                <div>• Essential concepts</div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-yellow-200"
                onClick={() => handleStartQuiz('intermediate')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Intermediate
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
              </CardTitle>
              <CardDescription>
                Applications and algorithmic constructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div>• Algorithm explanations</div>
                <div>• Construction problems</div>
                <div>• Applied scenarios</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-red-200"
                onClick={() => handleStartQuiz('advanced')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Advanced Level
                <Badge variant="secondary" className="bg-red-100 text-red-800">Expert</Badge>
              </CardTitle>
              <CardDescription>
                Complex proofs and theoretical analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div>• Formal proofs required</div>
                <div>• Advanced constructions</div>
                <div>• Theoretical depth</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Quiz Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Format</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Short answer questions requiring recall</li>
                  <li>• No multiple choice or hints provided</li>
                  <li>• Mix of definitions, explanations, and problems</li>
                  <li>• Questions cover all major topics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Process</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Answer each question in the text area</li>
                  <li>• No going back to previous questions</li>
                  <li>• Complete answers shown at the end</li>
                  <li>• Take your time to think through each answer</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-slate-900 mb-2">Topics Covered</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Finite Automata</Badge>
                <Badge variant="outline">Regular Languages</Badge>
                <Badge variant="outline">Context-Free Grammars</Badge>
                <Badge variant="outline">Pushdown Automata</Badge>
                <Badge variant="outline">Turing Machines</Badge>
                <Badge variant="outline">Complexity Theory</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}