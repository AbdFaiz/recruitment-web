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
    deptid: string;
    deptname: string;
    companyid: number;
    deptprofile: string;
    status: string;
};

type Props = {
    division: Division;
    companies: Company[];
};

export default function DivisionsEdit({ division, companies }: Props) {
    return (
        <>
            <Head title="Edit Divisi" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Divisi" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/divisions/${division.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="deptid">Kode Divisi</Label>
                                        <Input id="deptid" name="deptid" defaultValue={division.deptid} className="h-10 rounded-lg" required />
                                        <InputError message={errors.deptid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="deptname">Nama Divisi</Label>
                                        <Input id="deptname" name="deptname" defaultValue={division.deptname} className="h-10 rounded-lg" required />
                                        <InputError message={errors.deptname} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="companyid">Perusahaan</Label>
                                        <select id="companyid" name="companyid" defaultValue={division.companyid} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Perusahaan --</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.companyid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="deptprofile">Profil Divisi</Label>
                                        <textarea id="deptprofile" name="deptprofile" rows={4} defaultValue={division.deptprofile || ''} className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi divisi..." />
                                        <InputError message={errors.deptprofile} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" defaultValue={division.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                            <option value="active">Active</option>
                                            <option value="unactive">Unactive</option>
                                        </select>
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

DivisionsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Divisi', href: '/admin/divisions' },
        { title: 'Edit', href: '#' },
    ],
};
