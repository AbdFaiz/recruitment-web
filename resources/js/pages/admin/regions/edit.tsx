import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

type Region = {
    id: number;
    regionid: string;
    name: string;
    slug: string;
    address: string;
    city: string;
    province: string;
    postcode: string;
    phone: string;
    head_name: string;
    status: string;
};

type Props = { region: Region };

export default function RegionsEdit({ region }: Props) {
    return (
        <>
            <Head title="Edit Region" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Region" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/regions/${region.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="regionid">Kode Region</Label>
                                        <Input id="regionid" name="regionid" defaultValue={region.regionid} className="h-10 rounded-lg" required />
                                        <InputError message={errors.regionid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama</Label>
                                        <Input id="name" name="name" defaultValue={region.name} className="h-10 rounded-lg" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input id="slug" name="slug" defaultValue={region.slug} className="h-10 rounded-lg" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Alamat</Label>
                                        <Input id="address" name="address" defaultValue={region.address} className="h-10 rounded-lg" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">Kota</Label>
                                            <Input id="city" name="city" defaultValue={region.city} className="h-10 rounded-lg" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="province">Provinsi</Label>
                                            <Input id="province" name="province" defaultValue={region.province} className="h-10 rounded-lg" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postcode">Kode Pos</Label>
                                            <Input id="postcode" name="postcode" defaultValue={region.postcode || ''} className="h-10 rounded-lg" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Telepon</Label>
                                            <Input id="phone" name="phone" defaultValue={region.phone || ''} className="h-10 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="head_name">Kepala Region</Label>
                                        <Input id="head_name" name="head_name" defaultValue={region.head_name || ''} className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" defaultValue={region.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
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

RegionsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Region', href: '/admin/regions' },
        { title: 'Edit', href: '#' },
    ],
};
