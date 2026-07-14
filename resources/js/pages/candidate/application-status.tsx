import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

type TestResult = {
    id: number;
    total_score: number;
    is_passed: boolean;
    completed_at: string;
    test: {
        title: string;
        type: string;
    };
};

type Application = {
    id: number;
    status: string;
    applied_at: string;
    notes: string;
    hr_notes: string;
    vacancy: {
        title: string;
        region: { name: string };
        position: { positionname: string };
    };
    testResults: TestResult[];
} | null;

type Props = {
    application: Application;
};

const statusLabels: Record<string, string> = {
    submitted: 'Terkirim',
    reviewing: 'Sedang Direview',
    testing: 'Sedang Test',
    interview: 'Interview',
    offered: 'Ditawarkan',
    accepted: 'Diterima',
    rejected: 'Ditolak',
};

const statusBadge: Record<string, string> = {
    submitted: 'bg-info/10 text-info',
    reviewing: 'bg-warning/10 text-warning-foreground',
    testing: 'bg-violet-100 text-violet-700',
    interview: 'bg-indigo-100 text-indigo-700',
    offered: 'bg-success/10 text-success',
    accepted: 'bg-success/10 text-success',
    rejected: 'bg-destructive/10 text-destructive',
};

const statusSteps = ['submitted', 'reviewing', 'testing', 'interview', 'offered', 'accepted'];

export default function ApplicationStatus({ application }: Props) {
    if (!application) {
        return (
            <>
                <Head title="Status Lamaran" />
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                    <Heading title="Status Lamaran" description="Pantau progress lamaran Anda." />
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                                <Clock className="size-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Belum ada lamaran</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Anda belum mengajukan lamaran.</p>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    const currentStepIndex = statusSteps.indexOf(application.status);

    return (
        <>
            <Head title="Status Lamaran" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Status Lamaran" description="Pantau progress lamaran Anda secara real-time." />

                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold">{application.vacancy.title}</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {application.vacancy.region?.name} &bull; {application.vacancy.position?.positionname}
                                </p>
                            </div>
                            <Badge variant="secondary" className={`${statusBadge[application.status] || ''} text-xs font-bold`}>
                                {statusLabels[application.status] || application.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tanggal Lamar</p>
                                <p className="text-sm font-bold text-foreground">
                                    {new Date(application.applied_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Posisi</p>
                                <p className="text-sm font-bold text-foreground">{application.vacancy.position?.positionname}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</p>
                                <p className="text-sm font-bold text-foreground">{application.vacancy.region?.name}</p>
                            </div>
                        </div>

                        {application.hr_notes && (
                            <div className="rounded-xl bg-[var(--primary)]/5 p-4">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Catatan HRD</p>
                                <p className="text-sm leading-relaxed text-foreground">{application.hr_notes}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Progress Stepper */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle className="text-base font-bold">Progress Lamaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
                            <div className="relative flex items-center justify-between">
                                {statusSteps.map((step, index) => {
                                    const isActive = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;
                                    return (
                                        <div key={step} className="flex flex-col items-center">
                                            <div
                                                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                                                    isActive
                                                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-md'
                                                        : 'border-muted bg-white text-muted-foreground'
                                                } ${isCurrent ? 'ring-4 ring-[var(--primary)]/20' : ''}`}
                                            >
                                                {isActive ? (
                                                    <CheckCircle2 className="size-4" />
                                                ) : (
                                                    <Circle className="size-3" />
                                                )}
                                            </div>
                                            <p className={`mt-2 text-[11px] font-semibold text-center ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {statusLabels[step]}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {application.testResults && application.testResults.length > 0 && (
                    <Card className="border-[var(--border)]">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Hasil Test</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {application.testResults.map((result) => (
                                    <div key={result.id} className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 transition-colors hover:bg-[var(--accent)]">
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{result.test.title}</p>
                                            <p className="text-xs text-muted-foreground">{result.test.type}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-extrabold text-foreground">{result.total_score}</span>
                                            <Badge variant={result.is_passed ? 'success' : 'destructive'} className="text-[10px] font-bold">
                                                {result.is_passed ? 'Lulus' : 'Tidak Lulus'}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

ApplicationStatus.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/candidate' },
        { title: 'Status Lamaran', href: '/candidate/application-status' },
    ],
};
