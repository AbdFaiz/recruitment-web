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

type Echelon = {
    id: number;
    code: string;
    name: string;
    status: string;
};

type Props = {
    echelons: {
        data: Echelon[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function EchelonsIndex({ echelons }: Props) {
    return (
        <>
            <Head title="Echelons" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Echelon" description="Kelola data echelon" variant="hero">
                    <Link href="/admin/echelons/create">
                        <Button><Plus className="size-4" /> Tambah Echelon</Button>
                    </Link>
                </Heading>

                <Card className="border-[var(--border)]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {echelons.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    echelons.data.map((echelon) => (
                                        <TableRow key={echelon.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{echelon.code}</TableCell>
                                            <TableCell>{echelon.name}</TableCell>
                                            <TableCell>
                                                <Badge variant={echelon.status === 'active' ? 'success' : 'secondary'}>
                                                    {echelon.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/echelons/${echelon.id}/edit`}>
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

                {echelons.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: echelons.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === echelons.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/echelons?page=${page}`)}
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

EchelonsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Echelon', href: '/admin/echelons' },
    ],
};
