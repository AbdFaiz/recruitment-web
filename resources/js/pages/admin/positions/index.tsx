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

type Position = {
    id: number;
    positionid: string;
    positionname: string;
    level: string;
    status: string;
    company: { name: string } | null;
    division: { deptname: string } | null;
    workunit: { workunitname: string } | null;
};

type Props = {
    positions: {
        data: Position[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function PositionsIndex({ positions }: Props) {
    return (
        <>
            <Head title="Positions" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Position" description="Kelola data position" variant="hero">
                    <Button asChild>
                        <Link href="/admin/positions/create">
                            <Plus className="size-4" /> Tambah Position
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
                                {positions.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    positions.data.map((position) => (
                                        <TableRow key={position.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{position.positionid}</TableCell>
                                            <TableCell>{position.positionname}</TableCell>
                                            <TableCell>{position.company?.name || '-'}</TableCell>
                                            <TableCell>{position.division?.deptname || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={position.status === 'active' ? 'success' : 'secondary'}>
                                                    {position.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/positions/${position.id}/edit`}>
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

                {positions.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: positions.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === positions.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/positions?page=${page}`)}
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

PositionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Position', href: '/admin/positions' },
    ],
};
