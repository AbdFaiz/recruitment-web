import { Head, Form, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

type Question = {
    id: number;
    question_text: string;
    type: string;
    options: string[];
    points: number;
};

type Test = {
    id: number;
    title: string;
    type: string;
    description: string;
    duration_minutes: number;
    passing_score: number;
    questions: Question[];
};

type Props = {
    test: Test;
    application: any;
    existingResult: any;
};

export default function TestTake({ test, application, existingResult }: Props) {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(test.duration_minutes * 60);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
            question_id: parseInt(questionId),
            answer,
        }));

        router.post(`/candidate/tests/${test.id}/submit`, {
            answers: answerArray,
        });
    };

    const handleStart = () => {
        router.post(`/candidate/tests/${test.id}/start`);
    };

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = test.questions.length;
    const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

    if (!existingResult) {
        return (
            <>
                <Head title={test.title} />
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                    <Card className="mx-auto max-w-2xl border-[var(--border)]">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl font-extrabold">{test.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-center text-sm text-muted-foreground leading-relaxed">{test.description}</p>
                            <div className="grid grid-cols-3 gap-4 rounded-xl bg-[var(--background)] p-4">
                                <div className="text-center">
                                    <p className="text-2xl font-extrabold text-foreground">{test.duration_minutes}</p>
                                    <p className="text-xs font-medium text-muted-foreground">Menit</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-extrabold text-foreground">{totalQuestions}</p>
                                    <p className="text-xs font-medium text-muted-foreground">Soal</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-extrabold text-foreground">{test.passing_score}</p>
                                    <p className="text-xs font-medium text-muted-foreground">Nilai Minimal</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
                                    Kembali
                                </Button>
                                <Button onClick={handleStart} variant="gradient" className="flex-1 gap-2">
                                    Mulai Test
                                    <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    const question = test.questions[currentQuestion];

    return (
        <>
            <Head title={test.title} />
            <div className="flex h-full flex-1 flex-col overflow-x-auto">
                {/* Sticky header */}
                <div className="sticky top-0 z-40 border-b border-[var(--border)] bg-white px-6 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-sm font-bold text-foreground">{test.title}</h1>
                            <p className="text-xs text-muted-foreground">
                                Soal {currentQuestion + 1} dari {totalQuestions}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-medium text-muted-foreground">
                                {answeredCount}/{totalQuestions} terjawab
                            </span>
                            <div className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-sm font-bold ${
                                timeLeft < 60 ? 'bg-destructive/10 text-destructive animate-pulse' : 'bg-[var(--background)] text-foreground'
                            }`}>
                                <Clock className="size-3.5" />
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                        <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--chart-2)] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-1 gap-6 p-6">
                    {/* Question navigation sidebar */}
                    <div className="hidden w-48 shrink-0 lg:block">
                        <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navigasi Soal</p>
                        <div className="grid grid-cols-5 gap-1.5 lg:grid-cols-4">
                            {test.questions.map((q, i) => (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQuestion(i)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                                        i === currentQuestion
                                            ? 'bg-[var(--primary)] text-white shadow-md'
                                            : answers[q.id]
                                                ? 'bg-success/10 text-success'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Question content */}
                    <div className="flex-1 space-y-4">
                        {question && (
                            <Card className="border-[var(--border)]">
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                                            {currentQuestion + 1}
                                        </span>
                                        <div>
                                            <CardTitle className="text-base font-bold leading-relaxed">
                                                {question.question_text}
                                            </CardTitle>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {question.type === 'multiple_choice' ? 'Pilihan Ganda' : question.type === 'true_false' ? 'Benar / Salah' : 'Essay'} &bull; {question.points} poin
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {question.type === 'multiple_choice' && question.options && (
                                        <div className="space-y-2">
                                            {question.options.map((option, i) => (
                                                <label
                                                    key={i}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                                                        answers[question.id] === option
                                                            ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                                                            : 'border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--background)]'
                                                    }`}
                                                >
                                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                                        answers[question.id] === option
                                                            ? 'border-[var(--primary)] bg-[var(--primary)]'
                                                            : 'border-muted-foreground/30'
                                                    }`}>
                                                        {answers[question.id] === option && (
                                                            <CheckCircle2 className="size-3 text-white" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    {question.type === 'true_false' && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {['True', 'False'].map((option) => (
                                                <label
                                                    key={option}
                                                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                                                        answers[question.id] === option
                                                            ? option === 'True'
                                                                ? 'border-success bg-success/5'
                                                                : 'border-destructive bg-destructive/5'
                                                            : 'border-[var(--border)] hover:border-[var(--primary)]/30'
                                                    }`}
                                                >
                                                    <span className="text-sm font-bold">{option === 'True' ? 'Benar' : 'Salah'}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    {question.type === 'essay' && (
                                        <textarea
                                            name={`question_${question.id}`}
                                            value={answers[question.id] || ''}
                                            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                                            className="w-full min-h-[150px] rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-sm transition-colors focus:border-[var(--primary)] focus:outline-none"
                                            placeholder="Tulis jawaban Anda di sini..."
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                                className="gap-1.5"
                            >
                                <ChevronLeft className="size-4" />
                                Sebelumnya
                            </Button>

                            <div className="flex gap-2">
                                {currentQuestion < totalQuestions - 1 ? (
                                    <Button
                                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                        className="gap-1.5"
                                    >
                                        Selanjutnya
                                        <ArrowRight className="size-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setShowConfirm(true)}
                                        variant="gradient"
                                        className="gap-1.5"
                                    >
                                        Selesai & Submit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile question nav */}
                <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-white p-3 lg:hidden">
                    <div className="mb-2 flex gap-1 overflow-x-auto">
                        {test.questions.map((q, i) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestion(i)}
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                                    i === currentQuestion
                                        ? 'bg-[var(--primary)] text-white'
                                        : answers[q.id]
                                            ? 'bg-success/10 text-success'
                                            : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} size="sm" className="flex-1">
                            <ChevronLeft className="size-3.5" />
                        </Button>
                        {currentQuestion < totalQuestions - 1 ? (
                            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} size="sm" className="flex-1">
                                <ArrowRight className="size-3.5" />
                            </Button>
                        ) : (
                            <Button onClick={() => setShowConfirm(true)} variant="gradient" size="sm" className="flex-1">
                                Submit
                            </Button>
                        )}
                    </div>
                </div>

                {/* Confirm modal */}
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <Card className="mx-4 max-w-md border-[var(--border)]">
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                                    <AlertTriangle className="size-6 text-warning-foreground" />
                                </div>
                                <CardTitle className="text-lg font-bold">Konfirmasi Submit</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-center text-sm text-muted-foreground">
                                    Anda yakin ingin submit jawaban? Setelah submit, jawaban tidak dapat diubah.
                                </p>
                                <div className="rounded-lg bg-[var(--background)] p-3 text-center text-sm">
                                    <span className="font-bold text-foreground">{answeredCount}</span>
                                    <span className="text-muted-foreground"> dari {totalQuestions} soal terjawab</span>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
                                        Batal
                                    </Button>
                                    <Button onClick={handleSubmit} variant="gradient" className="flex-1">
                                        Ya, Submit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}

TestTake.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/candidate' },
        { title: 'Test', href: '/candidate/tests' },
        { title: 'Kerjakan', href: '#' },
    ],
};
