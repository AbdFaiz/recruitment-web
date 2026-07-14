import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

type Company = {
    id: number;
    code: string;
    name: string;
    slug: string;
    address: string;
    city: string;
    province: string;
    postcode: string;
    phone: string;
    website: string;
    npwp: string;
    profile: string;
    status: string;
};

type Props = { company: Company };

export default function CompaniesEdit({ company }: Props) {
    return (
        <>
            <Head title="Edit Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Perusahaan" description={`Edit data ${company.name}`} />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/companies/${company.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="code" className="text-xs font-semibold">Kode</Label>
                                        <Input id="code" name="code" defaultValue={company.code} required className="h-10 rounded-lg" />
                                        <InputError message={errors.code} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-xs font-semibold">Nama</Label>
                                        <Input id="name" name="name" defaultValue={company.name} required className="h-10 rounded-lg" />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug" className="text-xs font-semibold">Slug</Label>
                                        <Input id="slug" name="slug" defaultValue={company.slug} required className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address" className="text-xs font-semibold">Alamat</Label>
                                        <Input id="address" name="address" defaultValue={company.address} required className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city" className="text-xs font-semibold">Kota</Label>
                                            <Input id="city" name="city" defaultValue={company.city} required className="h-10 rounded-lg" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="province" className="text-xs font-semibold">Provinsi</Label>
                                            <Input id="province" name="province" defaultValue={company.province} required className="h-10 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postcode" className="text-xs font-semibold">Kode Pos</Label>
                                            <Input id="postcode" name="postcode" defaultValue={company.postcode || ''} className="h-10 rounded-lg" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone" className="text-xs font-semibold">Telepon</Label>
                                            <Input id="phone" name="phone" defaultValue={company.phone || ''} className="h-10 rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="website" className="text-xs font-semibold">Website</Label>
                                        <Input id="website" name="website" defaultValue={company.website || ''} className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="npwp" className="text-xs font-semibold">NPWP</Label>
                                        <Input id="npwp" name="npwp" defaultValue={company.npwp || ''} className="h-10 rounded-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile" className="text-xs font-semibold">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} defaultValue={company.profile || ''} className="flex min-h-[80px] w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="Deskripsi perusahaan..." />
                                        <InputError message={errors.profile} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status" className="text-xs font-semibold">Status</Label>
                                        <select id="status" name="status" defaultValue={company.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
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

CompaniesEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Perusahaan', href: '/admin/companies' },
        { title: 'Edit', href: '#' },
    ],
};
