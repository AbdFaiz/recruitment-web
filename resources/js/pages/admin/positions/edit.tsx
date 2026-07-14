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
    workunitname: string;
    companyid: number;
    divisionid: number;
};

type Position = {
    id: number;
    positionid: string;
    positionname: string;
    companyid: number;
    divisionid: number;
    workunitid: number;
    level: string;
    profile: string;
    status: string;
};

type Props = {
    position: Position;
    companies: Company[];
    divisions: Division[];
    workunits: Workunit[];
};

export default function PositionsEdit({ position, companies, divisions, workunits }: Props) {
    return (
        <>
            <Head title="Edit Position" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Position" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/positions/${position.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="positionid">Kode Position</Label>
                                        <Input id="positionid" name="positionid" defaultValue={position.positionid} className="h-10 rounded-lg" required />
                                        <InputError message={errors.positionid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="positionname">Nama Position</Label>
                                        <Input id="positionname" name="positionname" defaultValue={position.positionname} className="h-10 rounded-lg" required />
                                        <InputError message={errors.positionname} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="companyid">Perusahaan</Label>
                                        <select id="companyid" name="companyid" defaultValue={position.companyid} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Perusahaan --</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.companyid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="divisionid">Divisi</Label>
                                        <select id="divisionid" name="divisionid" defaultValue={position.divisionid} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Divisi --</option>
                                            {divisions.map((division) => (
                                                <option key={division.id} value={division.id}>{division.deptname}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.divisionid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="workunitid">Unit Kerja</Label>
                                        <select id="workunitid" name="workunitid" defaultValue={position.workunitid} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Unit Kerja --</option>
                                            {workunits.map((workunit) => (
                                                <option key={workunit.id} value={workunit.id}>{workunit.workunitname}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.workunitid} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="level">Level</Label>
                                        <Input id="level" name="level" defaultValue={position.level || ''} className="h-10 rounded-lg" />
                                        <InputError message={errors.level} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile">Profil</Label>
                                        <textarea id="profile" name="profile" rows={4} defaultValue={position.profile || ''} className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi position..." />
                                        <InputError message={errors.profile} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" defaultValue={position.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
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

PositionsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Position', href: '/admin/positions' },
        { title: 'Edit', href: '#' },
    ],
};
