import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

type Grade = {
    id: number;
    code: string;
    name: string;
    profile: string;
    status: string;
};

type Props = { grade: Grade };

export default function GradesEdit({ grade }: Props) {
    return (
        <>
            <Head title="Edit Grade" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Grade" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/grades/${grade.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="code">Kode</Label>
                                        <Input id="code" name="code" defaultValue={grade.code} className="h-10 rounded-lg" required />
                                        <InputError message={errors.code} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input id="name" name="name" defaultValue={grade.name} className="h-10 rounded-lg" required />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} defaultValue={grade.profile || ''} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi grade..." />
                                        <InputError message={errors.profile} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" defaultValue={grade.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                            <option value="active">Active</option>
                                            <option value="unactive">Unactive</option>
                                        </select>
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

GradesEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Grade', href: '/admin/grades' },
        { title: 'Edit', href: '#' },
    ],
};
