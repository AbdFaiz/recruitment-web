import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Users, FileText, Bell, Clock, ArrowRight, Briefcase } from 'lucide-react';

type Props = {
    stats: {
        total_candidates: number;
        total_applications: number;
        pending_applications: number;
        unread_notifications: number;
    };
    recentApplications: Array<{
        id: number;
        status: string;
        applied_at: string;
        candidate: { user: { name: string } };
        vacancy: { title: string; region: { name: string }; position: { positionname: string } };
    }>;
    notifications: Array<{
        id: number;
        title: string;
        message: string;
        created_at: string;
    }>;
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

const statusLabels: Record<string, string> = {
    submitted: 'Terkirim',
    reviewing: 'Direview',
    testing: 'Testing',
    interview: 'Interview',
    offered: 'Ditawarkan',
    accepted: 'Diterima',
    rejected: 'Ditolak',
};

export default function AdminDashboard({ stats, recentApplications, notifications }: Props) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Dashboard" description="Ringkasan aktivitas rekrutmen" />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: 'Total Kandidat', value: stats.total_candidates, icon: Users, color: 'text-[var(--primary)]', bg: 'bg-[var(--primary)]/10' },
                        { title: 'Total Lamaran', value: stats.total_applications, icon: FileText, color: 'text-[var(--chart-2)]', bg: 'bg-[var(--chart-2)]/10' },
                        { title: 'Menunggu Review', value: stats.pending_applications, icon: Clock, color: 'text-warning-foreground', bg: 'bg-warning/10' },
                        { title: 'Notifikasi Baru', value: stats.unread_notifications, icon: Bell, color: 'text-violet-600', bg: 'bg-violet-100' },
                    ].map(({ title, value, icon: Icon, color, bg }) => (
                        <Card key={title} className="border-[var(--border)]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
                                    <Icon className={`h-4 w-4 ${color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-extrabold text-foreground">{value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-5">
                    <Card className="border-[var(--border)] lg:col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold">Lamaran Terbaru</CardTitle>
                            {recentApplications.length > 0 && (
                                <Link href="/admin/applicants" className="text-xs font-semibold text-[var(--primary)] hover:underline">
                                    Lihat Semua
                                </Link>
                            )}
                        </CardHeader>
                        <CardContent>
                            {recentApplications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Briefcase className="mb-2 size-8 text-muted-foreground/40" />
                                    <p className="text-sm text-muted-foreground">Belum ada lamaran.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {recentApplications.map((app) => (
                                        <Link
                                            key={app.id}
                                            href={`/admin/applicants/${app.id}`}
                                            className="flex items-center justify-between rounded-xl border border-[var(--border)] p-3 transition-all hover:bg-[var(--accent)] hover:shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                                                    {(app.candidate?.user?.name || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">
                                                        {app.candidate?.user?.name || '-'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {app.vacancy?.title || '-'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className={`${statusBadge[app.status] || ''} text-[10px] font-bold`}>
                                                    {statusLabels[app.status] || app.status}
                                                </Badge>
                                                <ArrowRight className="size-3.5 text-muted-foreground" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-[var(--border)] lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Notifikasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Bell className="mb-2 size-8 text-muted-foreground/40" />
                                    <p className="text-sm text-muted-foreground">Tidak ada notifikasi baru.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className="rounded-xl border border-[var(--border)] p-3">
                                            <p className="text-sm font-bold text-foreground">{notif.title}</p>
                                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{notif.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/admin' }],
};
