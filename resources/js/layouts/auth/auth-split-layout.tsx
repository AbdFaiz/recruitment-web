import { Link, usePage } from '@inertiajs/react';
import { Briefcase, LogIn, UserPlus } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-[var(--primary)] p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[var(--chart-2)]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkg4VjI4aDI4ek0xMiA0MHYySDB2LTJoMTJ6TTQ4IDM0djIaMjR2LTJINDh6TTQ4IDE0djJIMjRoLTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
                <Link
                    href={home()}
                    className="relative z-20 flex items-center gap-3 text-lg font-medium"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                        <AppLogoIcon className="size-6 fill-current text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold leading-tight">{name}</span>
                        <span className="text-xs font-medium text-white/50">Sistem Rekrutmen</span>
                    </div>
                </Link>
                <div className="relative z-20 mt-auto space-y-6">
                    <div className="space-y-3">
                        {[
                            { icon: Briefcase, label: 'Akses ratusan lowongan' },
                            { icon: LogIn, label: 'Proses seleksi transparan' },
                            { icon: UserPlus, label: 'Daftar secara gratis' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3 text-sm text-white/80">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10">
                                    <Icon className="size-4" />
                                </div>
                                {label}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-white/40">
                        &copy; {new Date().getFullYear()} ACS Recruitment System
                    </p>
                </div>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center gap-2.5 lg:hidden"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]">
                            <AppLogoIcon className="size-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-foreground">ACS Recruitment</span>
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
