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

type Test = {
    id: number;
    title: string;
    type: string;
    duration_minutes: number;
    passing_score: number;
    is_active: boolean;
    questions_count: number;
};

type Props = {
    tests: {
        data: Test[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

export default function TestsIndex({ tests }: Props) {
    return (
        <>
            <Head title="Tests" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tes" description="Kelola data tes" variant="hero">
                    <Link href="/admin/tests/create">
                        <Button><Plus className="size-4" /> Tambah Tes</Button>
                    </Link>
                </Heading>

                <Card className="border-[var(--border)]">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Tipe</TableHead>
                                    <TableHead>Durasi (menit)</TableHead>
                                    <TableHead>Nilai Lulus</TableHead>
                                    <TableHead>Soal</TableHead>
                                    <TableHead>Aktif</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tests.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Tidak ada data.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tests.data.map((test) => (
                                        <TableRow key={test.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{test.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{test.type}</Badge>
                                            </TableCell>
                                            <TableCell>{test.duration_minutes}</TableCell>
                                            <TableCell>{test.passing_score}</TableCell>
                                            <TableCell>{test.questions_count}</TableCell>
                                            <TableCell>
                                                <Badge variant={test.is_active ? 'success' : 'secondary'}>
                                                    {test.is_active ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link href={`/admin/tests/${test.id}/edit`}>
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                    </Link>
                                                    <Link href={`/admin/tests/${test.id}/questions`}>
                                                        <Button variant="secondary" size="sm">Kelola Soal</Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {tests.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: tests.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === tests.current_page ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(`/admin/tests?page=${page}`)}
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

TestsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Tes', href: '/admin/tests' },
    ],
};
