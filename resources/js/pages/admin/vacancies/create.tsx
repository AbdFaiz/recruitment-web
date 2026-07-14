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

type Props = {
    regions: Region[];
    positions: Position[];
};

export default function VacanciesCreate({ regions, positions }: Props) {
    return (
        <>
            <Head title="Tambah Lowongan" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Tambah Lowongan" />

                <Card className="max-w-2xl border-[var(--border)]">
                    <CardContent className="p-6">
                        <Form method="post" action="/admin/vacancies" className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Judul</Label>
                                        <Input id="title" name="title" placeholder="Software Engineer" className="h-10 rounded-lg" required />
                                        <InputError message={errors.title} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="region_id">Region</Label>
                                        <select id="region_id" name="region_id" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Region --</option>
                                            {regions.map((region) => (
                                                <option key={region.id} value={region.id}>{region.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.region_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="position_id">Position</Label>
                                        <select id="position_id" name="position_id" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                            <option value="">-- Pilih Position --</option>
                                            {positions.map((position) => (
                                                <option key={position.id} value={position.id}>{position.positionname}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.position_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Deskripsi</Label>
                                        <textarea id="description" name="description" rows={4} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Deskripsi lowongan..." />
                                        <InputError message={errors.description} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="requirements">Persyaratan</Label>
                                        <textarea id="requirements" name="requirements" rows={4} className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm" placeholder="Persyaratan lowongan..." />
                                        <InputError message={errors.requirements} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="employment_type">Tipe Kerja</Label>
                                        <select id="employment_type" name="employment_type" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
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
                                            <Input id="salary_min" name="salary_min" type="number" className="h-10 rounded-lg" />
                                            <InputError message={errors.salary_min} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="salary_max">Gaji Maksimum</Label>
                                            <Input id="salary_max" name="salary_max" type="number" className="h-10 rounded-lg" />
                                            <InputError message={errors.salary_max} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="quota">Kuota</Label>
                                            <Input id="quota" name="quota" type="number" className="h-10 rounded-lg" required />
                                            <InputError message={errors.quota} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="deadline">Deadline</Label>
                                            <Input id="deadline" name="deadline" type="date" className="h-10 rounded-lg" required />
                                            <InputError message={errors.deadline} />
                                        </div>
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

VacanciesCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Lowongan', href: '/admin/vacancies' },
        { title: 'Tambah', href: '/admin/vacancies/create' },
    ],
};
