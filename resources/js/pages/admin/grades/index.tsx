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

type Grade = {
    id: number;
    code: string;
    name: string;
    status: string;
};

type Props = {
    grades: {
        data: Grade[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function GradesIndex({ grades }: Props) {
    return (
        <>
            <Head title="Grades" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Grade" description="Kelola data grade" variant="hero">
                    <Link href="/admin/grades/create">
                        <Button><Plus className="size-4" /> Tambah Grade</Button>
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
                                {grades.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    grades.data.map((grade) => (
                                        <TableRow key={grade.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{grade.code}</TableCell>
                                            <TableCell>{grade.name}</TableCell>
                                            <TableCell>
                                                <Badge variant={grade.status === 'active' ? 'success' : 'secondary'}>
                                                    {grade.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/grades/${grade.id}/edit`}>
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

                {grades.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: grades.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === grades.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/grades?page=${page}`)}
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

GradesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Grade', href: '/admin/grades' },
    ],
};
