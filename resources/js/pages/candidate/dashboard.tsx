import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { ClipboardList, UserCheck, FileText, TestTube, ArrowRight, ChevronRight, AlertCircle, CheckCircle2, Clock, Briefcase } from 'lucide-react';

type Candidate = {
    id: number;
    status: string;
    application: {
        id: number;
        status: string;
        vacancy: {
            title: string;
            region: { name: string };
            position: { positionname: string };
        };
    } | null;
};

type Props = {
    candidate: Candidate | null;
    biodataComplete: boolean;
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

export default function CandidateDashboard({ candidate, biodataComplete }: Props) {
    const application = candidate?.application;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Dashboard" description="Selamat datang! Berikut status rekrutmen Anda." />

                {!biodataComplete && (
                    <Card className="border-warning/30 bg-gradient-to-r from-warning/5 to-white">
                        <CardContent className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                                    <AlertCircle className="size-5 text-warning-foreground" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Biodata belum lengkap</p>
                                    <p className="text-sm text-muted-foreground">Lengkapi biodata terlebih dahulu untuk bisa melamar pekerjaan.</p>
                                </div>
                            </div>
                            <Link href="/candidate/biodata">
                                <Button size="sm" className="gap-1.5">
                                    Isi Biodata
                                    <ChevronRight className="size-3.5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {biodataComplete && !application && (
                    <Card className="border-[var(--primary)]/20 bg-gradient-to-r from-[var(--primary)]/5 to-white">
                        <CardContent className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                                    <ClipboardList className="size-5 text-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Siap melamar pekerjaan!</p>
                                    <p className="text-sm text-muted-foreground">Biodata sudah lengkap. Pilih lowongan yang tersedia.</p>
                                </div>
                            </div>
                            <Link href="/candidate/apply">
                                <Button size="sm" variant="gradient" className="gap-1.5">
                                    Lamar Sekarang
                                    <ArrowRight className="size-3.5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            title: 'Biodata',
                            value: biodataComplete ? 'Lengkap' : 'Belum Lengkap',
                            icon: UserCheck,
                            color: biodataComplete ? 'text-success' : 'text-warning-foreground',
                            bg: biodataComplete ? 'bg-success/10' : 'bg-warning/10',
                            done: biodataComplete,
                        },
                        {
                            title: 'Lamaran',
                            value: application ? statusLabels[application.status] || application.status : 'Belum ada',
                            icon: FileText,
                            color: application ? 'text-[var(--primary)]' : 'text-muted-foreground',
                            bg: application ? 'bg-[var(--primary)]/10' : 'bg-muted',
                            done: !!application,
                        },
                        {
                            title: 'Lowongan',
                            value: application ? application.vacancy.title : '-',
                            icon: Briefcase,
                            color: application ? 'text-[var(--chart-2)]' : 'text-muted-foreground',
                            bg: application ? 'bg-[var(--chart-2)]/10' : 'bg-muted',
                            done: !!application,
                        },
                    ].map(({ title, value, icon: Icon, color, bg, done }) => (
                        <Card key={title} className="border-[var(--border)]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
                                    <Icon className={`h-4 w-4 ${color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                {title === 'Lamaran' && application ? (
                                    <Badge variant="secondary" className={`${statusBadge[application.status] || ''} text-[10px] font-bold`}>
                                        {value}
                                    </Badge>
                                ) : done ? (
                                    <Badge variant="secondary" className="bg-success/10 text-success text-[10px] font-bold">{value}</Badge>
                                ) : (
                                    <span className="text-sm text-muted-foreground">{value}</span>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {application && (
                    <Card className="border-[var(--border)]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold">Detail Lamaran</CardTitle>
                            <Link href="/candidate/application-status" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                                Lihat Detail
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lowongan</p>
                                    <p className="text-sm font-bold text-foreground">{application.vacancy.title}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Region</p>
                                    <p className="text-sm font-bold text-foreground">{application.vacancy.region?.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Posisi</p>
                                    <p className="text-sm font-bold text-foreground">{application.vacancy.position?.positionname}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                                    <Badge variant="secondary" className={`${statusBadge[application.status] || ''} text-[10px] font-bold`}>
                                        {statusLabels[application.status] || application.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2 border-t border-[var(--border)] pt-4">
                                <Link href="/candidate/application-status">
                                    <Button variant="outline" size="sm" className="gap-1.5">
                                        Status Lamaran
                                    </Button>
                                </Link>
                                <Link href="/candidate/tests">
                                    <Button size="sm" className="gap-1.5">
                                        <TestTube className="size-3.5" />
                                        Kerjakan Test
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

CandidateDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/candidate' }],
};
