import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { QuizQuestion } from "@/data/quizData";

interface Props {
  questions: QuizQuestion[];
  onPass: () => void;
  passed: boolean;
}

const CourseQuizSection = ({ questions, onPass, passed }: Props) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? questions.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;
  const passingScore = Math.ceil(questions.length * 0.6);
  const didPass = score >= passingScore;

  const handleSubmit = () => {
    setSubmitted(true);
    if (score >= passingScore) onPass();
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (passed) {
    return (
      <div className="bg-lms-success/10 border border-lms-success/30 rounded-xl p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-lms-success mx-auto mb-2" />
        <p className="font-bold text-lms-success text-lg">Quiz Passed!</p>
        <p className="text-sm text-muted-foreground mt-1">You've already passed this quiz.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">📝 Course Quiz</h2>
        <Badge variant="outline" className="text-xs">
          Pass: {passingScore}/{questions.length} correct
        </Badge>
      </div>

      {submitted && (
        <div className={`rounded-xl p-4 text-center ${didPass ? "bg-lms-success/10 border border-lms-success/30" : "bg-destructive/10 border border-destructive/30"}`}>
          <p className={`font-bold text-lg ${didPass ? "text-lms-success" : "text-destructive"}`}>
            {didPass ? "🎉 You Passed!" : "❌ Not Passed"}
          </p>
          <p className="text-sm text-muted-foreground">
            Score: {score}/{questions.length}
          </p>
          {!didPass && (
            <Button onClick={handleRetry} variant="outline" size="sm" className="mt-3">
              <RotateCcw className="h-4 w-4 mr-1" /> Try Again
            </Button>
          )}
        </div>
      )}

      <div className="space-y-5">
        {questions.map((q, qi) => {
          const selected = answers[q.id];
          const isCorrect = submitted && selected === q.correctIndex;
          const isWrong = submitted && selected !== undefined && selected !== q.correctIndex;

          return (
            <div key={q.id} className="bg-card border border-border rounded-xl p-5">
              <p className="font-medium text-foreground mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const showCorrect = submitted && oi === q.correctIndex;
                  const showWrong = submitted && isSelected && oi !== q.correctIndex;

                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setAnswers((p) => ({ ...p, [q.id]: oi }))}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-2
                        ${isSelected && !submitted ? "border-primary bg-primary/5 font-medium" : "border-border hover:border-primary/50"}
                        ${showCorrect ? "border-lms-success bg-lms-success/10 font-medium" : ""}
                        ${showWrong ? "border-destructive bg-destructive/10" : ""}
                        ${submitted ? "cursor-default" : "cursor-pointer"}
                      `}
                    >
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs flex-shrink-0
                        ${isSelected && !submitted ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"}
                        ${showCorrect ? "border-lms-success bg-lms-success text-primary-foreground" : ""}
                        ${showWrong ? "border-destructive bg-destructive text-primary-foreground" : ""}
                      `}>
                        {submitted ? (
                          showCorrect ? <CheckCircle2 className="h-4 w-4" /> : showWrong ? <XCircle className="h-4 w-4" /> : String.fromCharCode(65 + oi)
                        ) : (
                          String.fromCharCode(65 + oi)
                        )}
                      </span>
                      <span className={`${showCorrect ? "text-lms-success" : showWrong ? "text-destructive" : "text-foreground"}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <Button
          onClick={handleSubmit}
          className="w-full gradient-primary text-primary-foreground font-semibold py-6"
          disabled={Object.keys(answers).length < questions.length}
        >
          Submit Quiz ({Object.keys(answers).length}/{questions.length} answered)
        </Button>
      )}
    </div>
  );
};

export default CourseQuizSection;
