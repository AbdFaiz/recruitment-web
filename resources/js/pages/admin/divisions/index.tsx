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

type Division = {
    id: number;
    deptid: string;
    deptname: string;
    status: string;
    company: { name: string } | null;
};

type Props = {
    divisions: {
        data: Division[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function DivisionsIndex({ divisions }: Props) {
    return (
        <>
            <Head title="Divisions" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Divisi" description="Kelola data divisi" variant="hero">
                    <Button asChild>
                        <Link href="/admin/divisions/create">
                            <Plus className="size-4" /> Tambah Divisi
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
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {divisions.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    divisions.data.map((division) => (
                                        <TableRow key={division.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{division.deptid}</TableCell>
                                            <TableCell>{division.deptname}</TableCell>
                                            <TableCell>{division.company?.name || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={division.status === 'active' ? 'success' : 'secondary'}>
                                                    {division.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/divisions/${division.id}/edit`}>
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

                {divisions.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: divisions.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === divisions.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/divisions?page=${page}`)}
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

DivisionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Divisi', href: '/admin/divisions' },
    ],
};
