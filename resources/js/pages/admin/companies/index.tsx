import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Plus } from 'lucide-react';

type Company = {
    id: number;
    code: string;
    name: string;
    city: string;
    province: string;
    status: string;
};

type Props = {
    companies: {
        data: Company[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function CompaniesIndex({ companies }: Props) {
    return (
        <>
            <Head title="Companies" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Perusahaan" description="Kelola data perusahaan" variant="hero">
                    <Link href="/admin/companies/create">
                        <Button><Plus className="size-4" /> Tambah Perusahaan</Button>
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
                                {companies.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    companies.data.map((company) => (
                                        <TableRow key={company.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{company.code}</TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.city}</TableCell>
                                            <TableCell>{company.province}</TableCell>
                                            <TableCell>
                                                <Badge variant={company.status === 'active' ? 'success' : 'secondary'}>
                                                    {company.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/companies/${company.id}/edit`}>
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

                {companies.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: companies.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === companies.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/companies?page=${page}`)}
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

CompaniesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Perusahaan', href: '/admin/companies' },
    ],
};
