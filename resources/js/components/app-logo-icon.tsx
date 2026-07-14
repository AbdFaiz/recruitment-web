import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogoIconComponent(props: React.SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.15" />
            <rect x="5" y="8" width="3.5" height="16" rx="1.75" fill="currentColor" />
            <rect x="10.5" y="12" width="3.5" height="12" rx="1.75" fill="currentColor" fillOpacity="0.7" />
            <rect x="16" y="8" width="3.5" height="16" rx="1.75" fill="currentColor" fillOpacity="0.5" />
            <path d="M22 8L27 16L22 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}
