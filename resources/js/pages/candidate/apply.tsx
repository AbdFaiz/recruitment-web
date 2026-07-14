import { Head, Link, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowRight, Building2, AlertCircle } from 'lucide-react';

type Vacancy = {
    id: number;
    title: string;
    description: string;
    employment_type: string;
    salary_min: number;
    salary_max: number;
    deadline: string;
    region: { name: string; city: string };
    position: { positionname: string };
};

type Props = {
    vacancies: Vacancy[];
    existingApplication: any;
};

export default function CandidateApply({ vacancies, existingApplication }: Props) {
    return (
        <>
            <Head title="Lamar Pekerjaan" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Lamar Pekerjaan" description="Pilih lowongan yang tersedia dan kirimkan lamaran Anda." />

                {existingApplication && (
                    <Card className="border-warning/30 bg-gradient-to-r from-warning/5 to-white">
                        <CardContent className="flex items-center gap-3 p-4">
                            <AlertCircle className="size-5 shrink-0 text-warning-foreground" />
                            <p className="text-sm font-medium text-foreground">
                                Anda sudah memiliki lamaran aktif. Hanya dapat melamar 1 posisi.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {vacancies.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
                                <Briefcase className="size-7 text-[var(--primary)]" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Belum ada lowongan</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Lowongan akan segera tersedia. Pantau terus halaman ini.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                        {vacancies.map((vacancy) => (
                            <Card
                                key={vacancy.id}
                                className="group relative overflow-hidden border-[var(--border)] bg-white"
                            >
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--chart-2)] opacity-0 transition-opacity group-hover:opacity-100" />
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-base font-bold leading-snug">
                                                {vacancy.title}
                                            </CardTitle>
                                            <p className="mt-1 text-xs font-semibold text-[var(--primary)]">
                                                {vacancy.position?.positionname}
                                            </p>
                                        </div>
                                        <Badge variant="info" className="shrink-0 text-[10px] font-bold">
                                            {vacancy.employment_type}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2.5 pt-0">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Building2 className="size-3.5 shrink-0 text-[var(--primary)]/40" />
                                        <span className="truncate">{vacancy.region?.name}{vacancy.region?.city ? `, ${vacancy.region.city}` : ''}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <DollarSign className="size-3.5 shrink-0 text-[var(--primary)]/40" />
                                        <span>Rp {vacancy.salary_min?.toLocaleString('id-ID')} - {vacancy.salary_max?.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="size-3.5 shrink-0 text-[var(--primary)]/40" />
                                        <span>Batas: {new Date(vacancy.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    {vacancy.description && (
                                        <p className="pt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                            {vacancy.description}
                                        </p>
                                    )}
                                    {!existingApplication && (
                                        <div className="pt-2">
                                            <Form method="post" action="/candidate/apply">
                                                <input type="hidden" name="vacancy_id" value={vacancy.id} />
                                                <Button type="submit" className="w-full gap-1.5" variant="gradient" size="sm">
                                                    Lamar Sekarang
                                                    <ArrowRight className="size-3.5" />
                                                </Button>
                                            </Form>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

CandidateApply.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/candidate' },
        { title: 'Lamar Pekerjaan', href: '/candidate/apply' },
    ],
};
