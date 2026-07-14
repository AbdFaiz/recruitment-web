import { Head, Link, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';

type Test = {
    id: number;
    title: string;
    type: string;
    description: string;
    duration_minutes: number;
    passing_score: number;
};

type TestResult = {
    id: number;
    test_id: number;
    total_score: number;
    is_passed: boolean;
    completed_at: string;
    test: Test;
};

type Application = {
    id: number;
    status: string;
    vacancy: {
        title: string;
        region: { name: string };
        position: { positionname: string };
    };
};

type Props = {
    application: Application;
    tests: Test[];
    testResults: TestResult[];
};

const typeLabels: Record<string, string> = {
    psychotest: 'Psikotest',
    knowledge: 'Pengetahuan',
    technical: 'Technical',
    custom: 'Custom',
};

const typeBadge: Record<string, string> = {
    psychotest: 'bg-violet-100 text-violet-700',
    knowledge: 'bg-info/10 text-info',
    technical: 'bg-success/10 text-success',
    custom: 'bg-warning/10 text-warning-foreground',
};

export default function CandidateTests({ application, tests, testResults }: Props) {
    const getResultForTest = (testId: number) => testResults.find((r) => r.test_id === testId);

    return (
        <>
            <Head title="Test Saya" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Test Saya" description={`Lamaran: ${application.vacancy.title}`} />

                <Card className="border-[var(--border)]">
                    <CardContent className="flex items-center justify-between p-4">
                        <div>
                            <p className="text-sm font-bold text-foreground">{application.vacancy.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {application.vacancy.region?.name} &bull; {application.vacancy.position?.positionname}
                            </p>
                        </div>
                        <Badge variant="secondary" className={`${typeBadge.submitted || ''} text-[10px] font-bold`}>
                            {application.status}
                        </Badge>
                    </CardContent>
                </Card>

                {tests.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                                <Clock className="size-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Belum ada test</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Test akan tersedia setelah lamaran Anda direview.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {tests.map((test) => {
                            const result = getResultForTest(test.id);
                            const isCompleted = result?.completed_at;

                            return (
                                <Card key={test.id} className="group border-[var(--border)] bg-white">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-base font-bold">{test.title}</CardTitle>
                                                <Badge variant="secondary" className={`mt-1.5 text-[10px] font-bold ${typeBadge[test.type] || ''}`}>
                                                    {typeLabels[test.type] || test.type}
                                                </Badge>
                                            </div>
                                            {isCompleted ? (
                                                <Badge variant={result.is_passed ? 'success' : 'destructive'} className="text-[10px] font-bold">
                                                    {result.is_passed ? 'Lulus' : 'Tidak Lulus'} - {result.total_score}
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-[10px] font-bold">Belum Dikerjakan</Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {test.description && (
                                            <p className="text-xs leading-relaxed text-muted-foreground">{test.description}</p>
                                        )}
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="size-3.5" />
                                                <span>{test.duration_minutes} menit</span>
                                            </div>
                                            <span>Nilai minimal: {test.passing_score}</span>
                                        </div>

                                        {isCompleted ? (
                                            <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
                                                <CheckCircle className="size-4" />
                                                Selesai dikerjakan
                                            </div>
                                        ) : (
                                            <Link href={`/candidate/tests/${test.id}/take`}>
                                                <Button className="w-full gap-1.5" variant="gradient" size="sm">
                                                    Mulai Test
                                                    <ArrowRight className="size-3.5" />
                                                </Button>
                                            </Link>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

CandidateTests.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/candidate' },
        { title: 'Test Saya', href: '/candidate/tests' },
    ],
};
