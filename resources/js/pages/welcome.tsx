import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    ArrowRight,
    Shield,
    Users,
    Clock,
    Building2,
    ChevronRight,
    Sparkles,
    FileCheck,
    Target,
    Zap,
} from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

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
};

export default function Welcome({ vacancies }: Props) {
    return (
        <>
            <Head title="Rekrutmen Karyawan" />
            <div className="min-h-screen bg-[var(--background)]">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-[var(--border)]/60 bg-white/80 backdrop-blur-xl">
                    <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]">
                                <AppLogoIcon className="size-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold leading-tight text-foreground">
                                    ACS Recruitment
                                </span>
                                <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
                                    Sistem Rekrutmen Online
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="gap-1.5 font-semibold">
                                    <Shield className="size-3.5" />
                                    Masuk
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" variant="gradient" className="gap-1.5">
                                    Daftar Sekarang
                                    <ArrowRight className="size-3.5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary)]/95 to-[var(--chart-2)]" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg4VjI4aDI4ek0xMiA0MHYySDB2LTJoMTJ6TTQ4IDM0djIaMjR2LTJINDh6TTQ4IDE0djJIMjRoLTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
                    <div className="container relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                                <Sparkles className="size-3.5" />
                                Terbuka untuk Semua Kandidat
                            </div>
                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
                                Bangun Karir
                                <br />
                                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                    Bersama Kami
                                </span>
                            </h1>
                            <p className="mt-6 text-base text-white/60 sm:text-lg sm:leading-relaxed">
                                Temukan peluang terbaik untuk mengembangkan potensi diri.
                                Proses rekrutmen yang transparan, profesional, dan adil.
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link href="/register">
                                    <Button size="lg" className="gap-2 bg-white text-[var(--primary)] shadow-lg hover:bg-white/90 hover:shadow-xl">
                                        Mulai Melamar
                                        <ArrowRight className="size-4" />
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="ghost" className="gap-2 text-white hover:bg-white/10 hover:text-white">
                                        Sudah punya akun?
                                        <ChevronRight className="size-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 sm:gap-6">
                            {[
                                { icon: Users, value: 'Ribuan', label: 'Pelamar Terdaftar' },
                                { icon: Briefcase, value: '100+', label: 'Lowongan Aktif' },
                                { icon: Clock, value: '24/7', label: 'Akses Online' },
                            ].map(({ icon: Icon, value, label }) => (
                                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-sm transition-all hover:bg-white/15">
                                    <Icon className="mx-auto mb-2.5 size-5 text-white/50" />
                                    <div className="text-2xl font-extrabold text-white">{value}</div>
                                    <div className="mt-0.5 text-xs font-medium text-white/45">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="border-b border-[var(--border)] bg-white">
                    <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Cara Kerja
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Proses rekrutmen yang simpel dan transparan
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {[
                                {
                                    step: '01',
                                    icon: Users,
                                    title: 'Daftar & Isi Biodata',
                                    desc: 'Buat akun dan lengkapi data diri Anda melalui formulir online kami.',
                                },
                                {
                                    step: '02',
                                    icon: Target,
                                    title: 'Pilih & Lamar',
                                    desc: 'Jelajahi lowongan yang tersedia dan kirimkan lamaran Anda.',
                                },
                                {
                                    step: '03',
                                    icon: Zap,
                                    title: 'Ikuti Seleksi',
                                    desc: 'Kerjakan test online dan pantau status lamaran Anda secara real-time.',
                                },
                            ].map(({ step, icon: Icon, title, desc }) => (
                                <div key={step} className="relative rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition-all hover:shadow-lg hover:shadow-[var(--primary)]/5">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                                            {step}
                                        </div>
                                        <Icon className="size-5 text-[var(--primary)]" />
                                    </div>
                                    <h3 className="text-base font-bold text-foreground">{title}</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Listings */}
                <section className="container mx-auto max-w-7xl px-4 py-16 sm:px-6">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Lowongan Tersedia
                            </h2>
                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Posisi yang sedang dibuka saat ini
                            </p>
                        </div>
                    </div>

                    {vacancies.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
                                <Briefcase className="size-7 text-[var(--primary)]" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">
                                Belum ada lowongan
                            </h3>
                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Lowongan akan segera tersedia. Pantau terus halaman ini.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                                            <Badge
                                                variant="info"
                                                className="shrink-0 text-[10px] font-bold"
                                            >
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
                                            <span>
                                                Rp {vacancy.salary_min?.toLocaleString('id-ID')} - {vacancy.salary_max?.toLocaleString('id-ID')}
                                            </span>
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
                                        <Link href="/register" className="block pt-2">
                                            <Button
                                                className="w-full gap-1.5"
                                                variant="gradient"
                                                size="sm"
                                            >
                                                Lamar Sekarang
                                                <ArrowRight className="size-3.5" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="border-t border-[var(--border)] bg-white">
                    <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary)]">
                                    <AppLogoIcon className="size-3.5 text-white" />
                                </div>
                                <span className="text-sm font-bold text-foreground">ACS Recruitment</span>
                            </div>
                            <div className="flex items-center gap-6 text-xs text-muted-foreground">
                                <span>&copy; {new Date().getFullYear()} ACS Recruitment System</span>
                                <span className="hidden sm:inline">All rights reserved.</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
