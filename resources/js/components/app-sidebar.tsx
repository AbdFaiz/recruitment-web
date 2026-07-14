import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    FileText,
    LayoutGrid,
    MapPin,
    Briefcase,
    Users,
    ClipboardList,
    UserCheck,
    TestTube,
    Settings,
    ChevronDown,
    ListTodo,
    Sparkles,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

type PageProps = {
    auth: {
        user: {
            name: string;
            email: string;
            roles: string[];
        };
    };
};

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutGrid,
    },
];

const masterDataItems = [
    { title: 'Perusahaan', href: '/admin/companies', icon: Building2 },
    { title: 'Divisi', href: '/admin/divisions', icon: FileText },
    { title: 'Unit Kerja', href: '/admin/workunits', icon: Settings },
    { title: 'Posisi', href: '/admin/positions', icon: Briefcase },
    { title: 'Echelon', href: '/admin/echelons', icon: ChevronDown },
    { title: 'Grade', href: '/admin/grades', icon: ListTodo },
    { title: 'Region', href: '/admin/regions', icon: MapPin },
];

const recruitmentItems = [
    { title: 'Lowongan', href: '/admin/vacancies', icon: Briefcase },
    { title: 'Pelamar', href: '/admin/applicants', icon: Users },
    { title: 'Kelola Test', href: '/admin/tests', icon: TestTube },
];

const candidateNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/candidate',
        icon: LayoutGrid,
    },
    {
        title: 'Biodata Saya',
        href: '/candidate/biodata',
        icon: UserCheck,
    },
    {
        title: 'Lamar Pekerjaan',
        href: '/candidate/apply',
        icon: ClipboardList,
    },
    {
        title: 'Status Lamaran',
        href: '/candidate/application-status',
        icon: Sparkles,
    },
    {
        title: 'Test Saya',
        href: '/candidate/tests',
        icon: TestTube,
    },
];

function SidebarNavGroup({
    label,
    defaultOpen = true,
    children,
}: {
    label: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    return (
        <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
                    {label}
                </SidebarGroupLabel>
                {children}
            </SidebarGroup>
        </Collapsible>
    );
}

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const isAdmin = auth?.user?.roles?.includes('admin');

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/admin' : '/candidate'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isAdmin ? (
                    <>
                        <NavMain items={adminNavItems} groupLabel="Menu" />
                        <SidebarNavGroup label="Master Data">
                            <SidebarMenuSub>
                                {masterDataItems.map((item) => (
                                    <SidebarMenuSubItem key={item.title}>
                                        <SidebarMenuSubButton asChild>
                                            <Link href={item.href}>
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </SidebarNavGroup>
                        <SidebarNavGroup label="Recruitment">
                            <SidebarMenuSub>
                                {recruitmentItems.map((item) => (
                                    <SidebarMenuSubItem key={item.title}>
                                        <SidebarMenuSubButton asChild>
                                            <Link href={item.href}>
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </SidebarNavGroup>
                    </>
                ) : (
                    <NavMain items={candidateNavItems} groupLabel="Menu" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
