import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

export default function EchelonsCreate() {
    return (
        <>
            <Head title="Tambah Echelon" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tambah Echelon" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="post" action="/admin/echelons" className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="code">Kode</Label>
                                        <Input id="code" name="code" placeholder="ECH001" className="h-10 rounded-lg" required />
                                        <InputError message={errors.code} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input id="name" name="name" placeholder="Echelon I" className="h-10 rounded-lg" required />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi echelon..." />
                                        <InputError message={errors.profile} />
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

EchelonsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Echelon', href: '/admin/echelons' },
        { title: 'Tambah', href: '/admin/echelons/create' },
    ],
};
