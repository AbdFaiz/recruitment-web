import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20">
                <AppLogoIcon className="size-5 text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">
                    ACS Recruitment
                </span>
                <span className="truncate text-[10px] font-medium text-white/50">
                    Sistem Rekrutmen
                </span>
            </div>
        </>
    );
}
