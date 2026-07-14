import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

export default function CompaniesCreate() {
    return (
        <>
            <Head title="Tambah Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tambah Perusahaan" description="Isi data perusahaan baru" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="post" action="/admin/companies" className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="code" className="text-xs font-semibold">Kode</Label>
                                        <Input id="code" name="code" placeholder="CMP001" required className="h-10 rounded-lg" />
                                        <InputError message={errors.code} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-xs font-semibold">Nama</Label>
                                        <Input id="name" name="name" placeholder="PT Maju Bersama" required className="h-10 rounded-lg" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug" className="text-xs font-semibold">Slug</Label>
                                        <Input id="slug" name="slug" placeholder="maju-bersama" required className="h-10 rounded-lg" />
                                        <InputError message={errors.slug} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address" className="text-xs font-semibold">Alamat</Label>
                                        <Input id="address" name="address" required className="h-10 rounded-lg" />
                                        <InputError message={errors.address} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city" className="text-xs font-semibold">Kota</Label>
                                            <Input id="city" name="city" required className="h-10 rounded-lg" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="province" className="text-xs font-semibold">Provinsi</Label>
                                            <Input id="province" name="province" required className="h-10 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postcode" className="text-xs font-semibold">Kode Pos</Label>
                                            <Input id="postcode" name="postcode" className="h-10 rounded-lg" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone" className="text-xs font-semibold">Telepon</Label>
                                            <Input id="phone" name="phone" className="h-10 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="website" className="text-xs font-semibold">Website</Label>
                                        <Input id="website" name="website" placeholder="https://example.com" className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="npwp" className="text-xs font-semibold">NPWP</Label>
                                        <Input id="npwp" name="npwp" className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile" className="text-xs font-semibold">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} className="flex min-h-[80px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="Deskripsi perusahaan..." />
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

CompaniesCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Perusahaan', href: '/admin/companies' },
        { title: 'Tambah', href: '/admin/companies/create' },
    ],
};
