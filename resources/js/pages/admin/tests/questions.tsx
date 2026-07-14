import { Head, Link, Form, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Question = {
    id: number;
    question_text: string;
    type: string;
    options: string[] | string | null;
    correct_answer: string;
    points: number;
};

type Test = {
    id: number;
    title: string;
    type: string;
    questions: Question[];
};

type Props = { test: Test };

export default function TestsQuestions({ test }: Props) {
    const handleDelete = (questionId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            router.delete(`/admin/tests/${test.id}/questions/${questionId}`);
        }
    };

    return (
        <>
            <Head title={`Kelola Soal - ${test.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Kelola Soal" description={`${test.title} (${test.type})`} variant="hero">
                    <Link href="/admin/tests">
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </Heading>

                {/* Existing Questions */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Daftar Soal ({test.questions.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {test.questions.length === 0 ? (
                            <p className="text-center text-muted-foreground">Belum ada soal.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Pertanyaan</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Jawaban Benar</TableHead>
                                        <TableHead>Poin</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {test.questions.map((question, index) => (
                                        <TableRow key={question.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="max-w-md truncate">{question.question_text}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{question.type}</Badge>
                                            </TableCell>
                                            <TableCell>{question.correct_answer}</TableCell>
                                            <TableCell>{question.points}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(question.id)}
                                                >
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Add New Question */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Tambah Soal Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form method="post" action={`/admin/tests/${test.id}/questions`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="question_text">Pertanyaan</Label>
                                        <textarea id="question_text" name="question_text" rows={3} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Masukkan pertanyaan..." required />
                                        <InputError message={errors.question_text} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Tipe Soal</Label>
                                        <select id="type" name="type" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="multiple_choice">Multiple Choice</option>
                                            <option value="true_false">True / False</option>
                                            <option value="essay">Essay</option>
                                        </select>
                                        <InputError message={errors.type} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="options">Opsi (pisahkan dengan koma)</Label>
                                        <Input id="options" name="options" placeholder="A. Opsi 1, B. Opsi 2, C. Opsi 3, D. Opsi 4" className="h-10 rounded-lg" />
                                        <InputError message={errors.options} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="correct_answer">Jawaban Benar</Label>
                                            <Input id="correct_answer" name="correct_answer" placeholder="A" className="h-10 rounded-lg" required />
                                            <InputError message={errors.correct_answer} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="points">Poin</Label>
                                            <Input id="points" name="points" type="number" defaultValue={1} className="h-10 rounded-lg" required />
                                            <InputError message={errors.points} />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="submit" loading={processing}>
                                            Tambah Soal
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

TestsQuestions.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Tes', href: '/admin/tests' },
        { title: 'Kelola Soal', href: '#' },
    ],
};
