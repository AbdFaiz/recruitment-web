import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';

type Region = {
    id: number;
    name: string;
};

type Position = {
    id: number;
    positionid: string;
    positionname: string;
};

type Vacancy = {
    id: number;
    title: string;
    region_id: number;
    position_id: number;
    description: string;
    requirements: string;
    employment_type: string;
    salary_min: number;
    salary_max: number;
    quota: number;
    deadline: string;
    status: string;
};

type Props = {
    vacancy: Vacancy;
    regions: Region[];
    positions: Position[];
};

export default function VacanciesEdit({ vacancy, regions, positions }: Props) {
    return (
        <>
            <Head title="Edit Lowongan" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Edit Lowongan" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="put" action={`/admin/vacancies/${vacancy.id}`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Judul</Label>
                                        <Input id="title" name="title" defaultValue={vacancy.title} className="h-10 rounded-lg" required />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="region_id">Region</Label>
                                        <select id="region_id" name="region_id" defaultValue={vacancy.region_id} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Region --</option>
                                            {regions.map((region) => (
                                                <option key={region.id} value={region.id}>{region.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.region_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="position_id">Position</Label>
                                        <select id="position_id" name="position_id" defaultValue={vacancy.position_id} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Position --</option>
                                            {positions.map((position) => (
                                                <option key={position.id} value={position.id}>{position.positionname}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.position_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Deskripsi</Label>
                                        <textarea id="description" name="description" rows={4} defaultValue={vacancy.description || ''} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi lowongan..." />
                                        <InputError message={errors.description} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="requirements">Persyaratan</Label>
                                        <textarea id="requirements" name="requirements" rows={4} defaultValue={vacancy.requirements || ''} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Persyaratan lowongan..." />
                                        <InputError message={errors.requirements} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="employment_type">Tipe Kerja</Label>
                                        <select id="employment_type" name="employment_type" defaultValue={vacancy.employment_type} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Tipe --</option>
                                            <option value="full_time">Full Time</option>
                                            <option value="part_time">Part Time</option>
                                            <option value="contract">Contract</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                        <InputError message={errors.employment_type} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="salary_min">Gaji Minimum</Label>
                                            <Input id="salary_min" name="salary_min" type="number" defaultValue={vacancy.salary_min || ''} className="h-10 rounded-lg" />
                                            <InputError message={errors.salary_min} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="salary_max">Gaji Maksimum</Label>
                                            <Input id="salary_max" name="salary_max" type="number" defaultValue={vacancy.salary_max || ''} className="h-10 rounded-lg" />
                                            <InputError message={errors.salary_max} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="quota">Kuota</Label>
                                            <Input id="quota" name="quota" type="number" defaultValue={vacancy.quota} className="h-10 rounded-lg" required />
                                            <InputError message={errors.quota} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="deadline">Deadline</Label>
                                            <Input id="deadline" name="deadline" type="date" defaultValue={vacancy.deadline} className="h-10 rounded-lg" required />
                                            <InputError message={errors.deadline} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select id="status" name="status" defaultValue={vacancy.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                            <option value="open">Open</option>
                                            <option value="closed">Closed</option>
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

VacanciesEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Lowongan', href: '/admin/vacancies' },
        { title: 'Edit', href: '#' },
    ],
};
