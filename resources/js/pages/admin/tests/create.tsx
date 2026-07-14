import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

export default function TestsCreate() {
    return (
        <>
            <Head title="Tambah Tes" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tambah Tes" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="post" action="/admin/tests" className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Judul</Label>
                                        <Input id="title" name="title" placeholder="Tes Pengetahuan Umum" className="h-10 rounded-lg" required />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Tipe</Label>
                                        <select id="type" name="type" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Tipe --</option>
                                            <option value="psychotest">Psikotest</option>
                                            <option value="knowledge">Pengetahuan</option>
                                            <option value="technical">Teknikal</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                        <InputError message={errors.type} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Deskripsi</Label>
                                        <textarea id="description" name="description" rows={4} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi tes..." />
                                        <InputError message={errors.description} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="duration_minutes">Durasi (menit)</Label>
                                            <Input id="duration_minutes" name="duration_minutes" type="number" placeholder="60" className="h-10 rounded-lg" required />
                                            <InputError message={errors.duration_minutes} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="passing_score">Nilai Lulus</Label>
                                            <Input id="passing_score" name="passing_score" type="number" placeholder="70" className="h-10 rounded-lg" required />
                                            <InputError message={errors.passing_score} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input id="is_active" name="is_active" type="checkbox" value="1" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="is_active">Aktif</Label>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                            Batal
                                        </Button>
                                        <Button type="submit" loading={processing}>
                                            Simpan
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

TestsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Tes', href: '/admin/tests' },
        { title: 'Tambah', href: '/admin/tests/create' },
    ],
};
