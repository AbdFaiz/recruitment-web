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

type Region = {
    id: number;
    regionid: string;
    name: string;
    city: string;
    province: string;
    status: string;
};

type Props = {
    regions: {
        data: Region[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function RegionsIndex({ regions }: Props) {
    return (
        <>
            <Head title="Regions" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Region" description="Kelola data region" variant="hero">
                    <Link href="/admin/regions/create">
                        <Button><Plus className="size-4" /> Tambah Region</Button>
                    </Link>
                </Heading>

                <Card className="border-[var(--border)]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Kota</TableHead>
                                    <TableHead>Provinsi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {regions.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    regions.data.map((region) => (
                                        <TableRow key={region.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{region.regionid}</TableCell>
                                            <TableCell>{region.name}</TableCell>
                                            <TableCell>{region.city}</TableCell>
                                            <TableCell>{region.province}</TableCell>
                                            <TableCell>
                                                <Badge variant={region.status === 'active' ? 'success' : 'secondary'}>
                                                    {region.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/regions/${region.id}/edit`}>
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

                {regions.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: regions.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === regions.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/regions?page=${page}`)}
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

RegionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Region', href: '/admin/regions' },
    ],
};
