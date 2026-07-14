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

type Workunit = {
    id: number;
    workunitid: string;
    workunitname: string;
    companyid: number;
    divisionid: number;
    profile: string;
    status: string;
};

type Props = {
    workunit: Workunit;
    companies: Company[];
    divisions: Division[];
};

export default function WorkunitsEdit({ workunit, companies, divisions }: Props) {
    return (
        <>
            <Head title="Edit Unit Kerja" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Unit Kerja" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/workunits/${workunit.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="workunitid">Kode Unit Kerja</Label>
                                        <Input id="workunitid" name="workunitid" defaultValue={workunit.workunitid} className="h-10 rounded-lg" required />
                                        <InputError message={errors.workunitid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="workunitname">Nama Unit Kerja</Label>
                                        <Input id="workunitname" name="workunitname" defaultValue={workunit.workunitname} className="h-10 rounded-lg" required />
                                        <InputError message={errors.workunitname} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="companyid">Perusahaan</Label>
                                        <select id="companyid" name="companyid" defaultValue={workunit.companyid} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Perusahaan --</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.companyid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="divisionid">Divisi</Label>
                                        <select id="divisionid" name="divisionid" defaultValue={workunit.divisionid} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Divisi --</option>
                                            {divisions.map((division) => (
                                                <option key={division.id} value={division.id}>{division.deptname}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.divisionid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} defaultValue={workunit.profile || ''} className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi unit kerja..." />
                                        <InputError message={errors.profile} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" defaultValue={workunit.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
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

WorkunitsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Unit Kerja', href: '/admin/workunits' },
        { title: 'Edit', href: '#' },
    ],
};
