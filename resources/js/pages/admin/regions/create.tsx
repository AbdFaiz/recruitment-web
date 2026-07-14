import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

export default function RegionsCreate() {
    return (
        <>
            <Head title="Tambah Region" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tambah Region" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="post" action="/admin/regions" className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="regionid">Kode Region</Label>
                                        <Input id="regionid" name="regionid" placeholder="REG001" className="h-10 rounded-lg" required />
                                        <InputError message={errors.regionid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input id="name" name="name" placeholder="Jakarta" className="h-10 rounded-lg" required />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input id="slug" name="slug" placeholder="jakarta" className="h-10 rounded-lg" required />
                                        <InputError message={errors.slug} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Alamat</Label>
                                        <Input id="address" name="address" className="h-10 rounded-lg" required />
                                        <InputError message={errors.address} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">Kota</Label>
                                            <Input id="city" name="city" className="h-10 rounded-lg" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="province">Provinsi</Label>
                                            <Input id="province" name="province" className="h-10 rounded-lg" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postcode">Kode Pos</Label>
                                            <Input id="postcode" name="postcode" className="h-10 rounded-lg" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Telepon</Label>
                                            <Input id="phone" name="phone" className="h-10 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="head_name">Kepala Region</Label>
                                        <Input id="head_name" name="head_name" className="h-10 rounded-lg" />
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

RegionsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Region', href: '/admin/regions' },
        { title: 'Tambah', href: '/admin/regions/create' },
    ],
};
