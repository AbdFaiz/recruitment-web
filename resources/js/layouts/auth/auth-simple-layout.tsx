import { Link, usePage } from '@inertiajs/react';
import { Briefcase, CheckCircle, Users, ArrowRight } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh">
            {/* Left branding panel */}
            <div className="hidden w-[520px] flex-col justify-between bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[var(--chart-2)] p-10 text-white lg:flex xl:w-[580px]">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg4VjI4aDI4ek0xMiA0MHYySDB2LTJoMTJ6TTQ4IDM0djIaMjR2LTJINDh6TTQ4IDE0djJIMjRoLTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />

                <div className="relative">
                    <Link href={home()} className="flex items-center gap-3 font-medium">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                            <AppLogoIcon className="size-6 fill-current text-white" />
                        </div>
                        <div>
                            <span className="text-lg font-bold tracking-tight">ACS Recruitment</span>
                            <span className="block text-[11px] font-medium text-white/50">Sistem Rekrutmen Online</span>
                        </div>
                    </Link>
                </div>

                <div className="relative space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
                            Bangun Karir
                            <br />
                            Impian Anda
                        </h2>
                        <p className="max-w-sm text-sm leading-relaxed text-white/60">
                            Bergabunglah dengan ribuan kandidat yang telah menemukan peluang karir terbaik melalui platform kami.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Briefcase, label: 'Akses ratusan lowongan dari perusahaan terkemuka' },
                            { icon: CheckCircle, label: 'Proses seleksi yang transparan dan profesional' },
                            { icon: Users, label: 'Bergabung dengan komunitas profesional kami' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3.5 text-sm text-white/75">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                    <Icon className="size-4.5" />
                                </div>
                                <span className="leading-snug">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative text-xs text-white/30">
                    &copy; {new Date().getFullYear()} ACS Recruitment System. All rights reserved.
                </p>
            </div>

            {/* Right form panel */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-[420px]">
                    <Link
                        href={home()}
                        className="mb-10 flex items-center gap-2.5 font-medium lg:hidden"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]">
                            <AppLogoIcon className="size-5 fill-current text-white" />
                        </div>
                        <span className="text-lg font-bold">ACS Recruitment</span>
                    </Link>

                    <div className="mb-8 space-y-2">
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
