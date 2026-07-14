import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Workunit = {
    id: number;
    workunitid: string;
    workunitname: string;
    status: string;
    company: { name: string } | null;
    division: { deptname: string } | null;
};

type Props = {
    workunits: {
        data: Workunit[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function WorkunitsIndex({ workunits }: Props) {
    return (
        <>
            <Head title="Workunits" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Unit Kerja" description="Kelola data unit kerja" variant="hero">
                    <Button asChild>
                        <Link href="/admin/workunits/create">
                            <Plus className="size-4" /> Tambah Unit Kerja
                        </Link>
                    </Button>
                </Heading>

                <Card className="border-[var(--border)]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Perusahaan</TableHead>
                                    <TableHead>Divisi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workunits.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    workunits.data.map((workunit) => (
                                        <TableRow key={workunit.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{workunit.workunitid}</TableCell>
                                            <TableCell>{workunit.workunitname}</TableCell>
                                            <TableCell>{workunit.company?.name || '-'}</TableCell>
                                            <TableCell>{workunit.division?.deptname || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={workunit.status === 'active' ? 'success' : 'secondary'}>
                                                    {workunit.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/workunits/${workunit.id}/edit`}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {workunits.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: workunits.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === workunits.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/workunits?page=${page}`)}
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

WorkunitsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Unit Kerja', href: '/admin/workunits' },
    ],
};
