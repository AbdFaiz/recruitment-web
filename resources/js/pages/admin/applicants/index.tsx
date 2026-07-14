import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Application = {
    id: number;
    status: string;
    applied_at: string;
    candidate: { user: { name: string } } | null;
    vacancy: {
        title: string;
        region: { name: string } | null;
        position: { positionname: string } | null;
    } | null;
};

type Props = {
    applications: {
        data: Application[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        status?: string;
    };
};

const statusColors: Record<string, string> = {
    submitted: 'bg-blue-100 text-blue-800',
    reviewing: 'bg-yellow-100 text-yellow-800',
    testing: 'bg-purple-100 text-purple-800',
    interview: 'bg-indigo-100 text-indigo-800',
    offered: 'bg-green-100 text-green-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

export default function ApplicantsIndex({ applications, filters }: Props) {
    const handleFilterChange = (value: string) => {
        const params: Record<string, string> = {};
        if (value) {
            params.status = value;
        }
        router.get('/admin/applicants', params, { preserveState: true });
    };

    return (
        <>
            <Head title="Applicants" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Pelamar" description="Kelola data pelamar" variant="hero" />

                {/* Filter */}
                <Card className="border-[var(--border)]">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="grid gap-2">
                                <Label>Filter Status</Label>
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilterChange(e.target.value)}
                                    className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="reviewing">Reviewing</option>
                                    <option value="testing">Testing</option>
                                    <option value="interview">Interview</option>
                                    <option value="offered">Offered</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-[var(--border)]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Kandidat</TableHead>
                                    <TableHead>Lowongan</TableHead>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal Lamar</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    applications.data.map((application) => (
                                        <TableRow key={application.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{application.candidate?.user?.name || '-'}</TableCell>
                                            <TableCell>{application.vacancy?.title || '-'}</TableCell>
                                            <TableCell>{application.vacancy?.region?.name || '-'}</TableCell>
                                            <TableCell>{application.vacancy?.position?.positionname || '-'}</TableCell>
                                            <TableCell>
                                                <Badge className={statusColors[application.status] || ''}>
                                                    {application.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{application.applied_at}</TableCell>
                                            <TableCell>
                                                <Link href={`/admin/applicants/${application.id}`}>
                                                    <Button variant="outline" size="sm">View</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {applications.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: applications.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === applications.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/applicants?page=${page}`, { status: filters.status || '' })}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

ApplicantsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Pelamar', href: '/admin/applicants' },
    ],
};
