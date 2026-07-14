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

type Vacancy = {
    id: number;
    title: string;
    quota: number;
    deadline: string;
    status: string;
    region: { name: string } | null;
    position: { positionname: string } | null;
};

type Props = {
    vacancies: {
        data: Vacancy[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function VacanciesIndex({ vacancies }: Props) {
    return (
        <>
            <Head title="Vacancies" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Lowongan" description="Kelola data lowongan" variant="hero">
                    <Link href="/admin/vacancies/create">
                        <Button><Plus className="size-4" /> Tambah Lowongan</Button>
                    </Link>
                </Heading>

                <Card className="border-[var(--border)]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Kuota</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vacancies.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    vacancies.data.map((vacancy) => (
                                        <TableRow key={vacancy.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{vacancy.title}</TableCell>
                                            <TableCell>{vacancy.region?.name || '-'}</TableCell>
                                            <TableCell>{vacancy.position?.positionname || '-'}</TableCell>
                                            <TableCell>{vacancy.quota}</TableCell>
                                            <TableCell>{vacancy.deadline}</TableCell>
                                            <TableCell>
                                                <Badge variant={vacancy.status === 'open' ? 'success' : 'secondary'}>
                                                    {vacancy.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/vacancies/${vacancy.id}/edit`}>
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

                {vacancies.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: vacancies.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === vacancies.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/vacancies?page=${page}`)}
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

VacanciesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Lowongan', href: '/admin/vacancies' },
    ],
};
