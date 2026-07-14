import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

type Company = {
    id: number;
    name: string;
};

type Division = {
    id: number;
    deptname: string;
    companyid: number;
};

type Props = {
    companies: Company[];
    divisions: Division[];
};

export default function WorkunitsCreate({ companies, divisions }: Props) {
    return (
        <>
            <Head title="Tambah Unit Kerja" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tambah Unit Kerja" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="post" action="/admin/workunits" className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="workunitid">Kode Unit Kerja</Label>
                                        <Input id="workunitid" name="workunitid" placeholder="WKU001" className="h-10 rounded-lg" required />
                                        <InputError message={errors.workunitid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="workunitname">Nama Unit Kerja</Label>
                                        <Input id="workunitname" name="workunitname" placeholder="Backend Development" className="h-10 rounded-lg" required />
                                        <InputError message={errors.workunitname} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="companyid">Perusahaan</Label>
                                        <select id="companyid" name="companyid" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Perusahaan --</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.companyid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="divisionid">Divisi</Label>
                                        <select id="divisionid" name="divisionid" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Divisi --</option>
                                            {divisions.map((division) => (
                                                <option key={division.id} value={division.id}>{division.deptname}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.divisionid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi unit kerja..." />
                                        <InputError message={errors.profile} />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                            Batal
                                        </Button>
                                        <Button type="submit" loading={processing}>Simpan</Button>
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

WorkunitsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Unit Kerja', href: '/admin/workunits' },
        { title: 'Tambah', href: '/admin/workunits/create' },
    ],
};
