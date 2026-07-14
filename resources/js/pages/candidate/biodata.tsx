import { Head, Form, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Save, UserCheck, GraduationCap, Briefcase, Users, Plus, Trash2 } from 'lucide-react';

type Education = {
    id: number;
    level: string;
    major: string;
    institution_name: string;
    graduation_year: string;
    gpa: string;
};

type Experience = {
    id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string;
    last_salary: string;
};

type Family = {
    id: number;
    name: string;
    relation_status: string;
    dob: string;
    job: string;
};

type Candidate = {
    id: number;
    status: string;
    location: string;
    nickname: string;
    citizenid: string;
    kkid: string;
    pob: string;
    dob: string;
    address1: string;
    province1: string;
    city1: string;
    postcode1: string;
    address2: string;
    province2: string;
    city2: string;
    postcode2: string;
    email_personal: string;
    gender: string;
    homephone: string;
    handphone: string;
    weight: number;
    height: number;
    bloodtype: string;
    nationality: string;
    ethnic: string;
    religion: string;
    maritalid: string;
    numchilds: number;
    educations: Education[];
    experiences: Experience[];
    families: Family[];
};

type Props = {
    candidate: Candidate | null;
};

const steps = [
    { key: 'personal', label: 'Data Pribadi', icon: UserCheck },
    { key: 'education', label: 'Pendidikan', icon: GraduationCap },
    { key: 'experience', label: 'Pengalaman', icon: Briefcase },
    { key: 'family', label: 'Keluarga', icon: Users },
] as const;

type StepKey = (typeof steps)[number]['key'];

export default function CandidateBiodata({ candidate }: Props) {
    const [activeStep, setActiveStep] = useState<StepKey>('personal');

    const currentIndex = steps.findIndex((s) => s.key === activeStep);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === steps.length - 1;

    const goNext = () => {
        if (!isLast) setActiveStep(steps[currentIndex + 1].key);
    };
    const goPrev = () => {
        if (!isFirst) setActiveStep(steps[currentIndex - 1].key);
    };

    return (
        <>
            <Head title="Biodata Saya" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Biodata Saya"
                        description="Lengkapi data diri Anda untuk proses rekrutmen."
                        variant="default"
                    />
                    <Badge variant={candidate?.status === 'complete' ? 'success' : 'warning'} className="text-xs font-bold">
                        {candidate?.status === 'complete' ? 'Lengkap' : 'Belum Lengkap'}
                    </Badge>
                </div>

                {/* Step indicator */}
                <Card className="border-[var(--border)]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => {
                                const isActive = step.key === activeStep;
                                const isDone = index < currentIndex;
                                const Icon = step.icon;
                                return (
                                    <button
                                        key={step.key}
                                        onClick={() => setActiveStep(step.key)}
                                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 transition-all ${
                                            isActive
                                                ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                                                : isDone
                                                    ? 'text-success'
                                                    : 'text-muted-foreground hover:bg-[var(--background)]'
                                        }`}
                                    >
                                        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                            isActive
                                                ? 'bg-[var(--primary)] text-white'
                                                : isDone
                                                    ? 'bg-success/10 text-success'
                                                    : 'bg-muted text-muted-foreground'
                                        }`}>
                                            {isDone ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
                                        </div>
                                        <span className="hidden text-xs font-semibold sm:inline">{step.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Step content */}
                {activeStep === 'personal' && (
                    <Card className="border-[var(--border)]">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Data Pribadi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form method="put" action="/candidate/biodata/personal" className="space-y-5">
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="nickname" className="text-xs font-semibold">Nama Panggilan</Label>
                                                <Input id="nickname" name="nickname" defaultValue={candidate?.nickname || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.nickname} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="citizenid" className="text-xs font-semibold">NIK</Label>
                                                <Input id="citizenid" name="citizenid" defaultValue={candidate?.citizenid || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.citizenid} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="kkid" className="text-xs font-semibold">No KK</Label>
                                                <Input id="kkid" name="kkid" defaultValue={candidate?.kkid || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.kkid} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="pob" className="text-xs font-semibold">Tempat Lahir</Label>
                                                <Input id="pob" name="pob" defaultValue={candidate?.pob || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.pob} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="dob" className="text-xs font-semibold">Tanggal Lahir</Label>
                                                <Input id="dob" name="dob" type="date" defaultValue={candidate?.dob || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.dob} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="gender" className="text-xs font-semibold">Jenis Kelamin</Label>
                                                <select id="gender" name="gender" defaultValue={candidate?.gender || ''} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                                    <option value="">Pilih</option>
                                                    <option value="male">Laki-laki</option>
                                                    <option value="female">Perempuan</option>
                                                </select>
                                                <InputError message={errors.gender} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="address1" className="text-xs font-semibold">Alamat KTP</Label>
                                            <Input id="address1" name="address1" defaultValue={candidate?.address1 || ''} className="h-10 rounded-lg" />
                                            <InputError message={errors.address1} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="province1" className="text-xs font-semibold">Provinsi</Label>
                                                <Input id="province1" name="province1" defaultValue={candidate?.province1 || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.province1} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="city1" className="text-xs font-semibold">Kota</Label>
                                                <Input id="city1" name="city1" defaultValue={candidate?.city1 || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.city1} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="postcode1" className="text-xs font-semibold">Kode Pos</Label>
                                                <Input id="postcode1" name="postcode1" defaultValue={candidate?.postcode1 || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.postcode1} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="address2" className="text-xs font-semibold">Alamat Domisili</Label>
                                            <Input id="address2" name="address2" defaultValue={candidate?.address2 || ''} className="h-10 rounded-lg" />
                                            <InputError message={errors.address2} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="province2" className="text-xs font-semibold">Provinsi Domisili</Label>
                                                <Input id="province2" name="province2" defaultValue={candidate?.province2 || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.province2} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="city2" className="text-xs font-semibold">Kota Domisili</Label>
                                                <Input id="city2" name="city2" defaultValue={candidate?.city2 || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.city2} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="postcode2" className="text-xs font-semibold">Kode Pos Domisili</Label>
                                                <Input id="postcode2" name="postcode2" defaultValue={candidate?.postcode2 || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.postcode2} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email_personal" className="text-xs font-semibold">Email</Label>
                                                <Input id="email_personal" name="email_personal" type="email" defaultValue={candidate?.email_personal || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.email_personal} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="homephone" className="text-xs font-semibold">Telp Rumah</Label>
                                                <Input id="homephone" name="homephone" defaultValue={candidate?.homephone || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.homephone} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="handphone" className="text-xs font-semibold">Handphone</Label>
                                                <Input id="handphone" name="handphone" defaultValue={candidate?.handphone || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.handphone} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="weight" className="text-xs font-semibold">Berat (kg)</Label>
                                                <Input id="weight" name="weight" type="number" defaultValue={candidate?.weight ?? ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.weight} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="height" className="text-xs font-semibold">Tinggi (cm)</Label>
                                                <Input id="height" name="height" type="number" defaultValue={candidate?.height ?? ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.height} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="bloodtype" className="text-xs font-semibold">Golongan Darah</Label>
                                                <select id="bloodtype" name="bloodtype" defaultValue={candidate?.bloodtype || ''} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                                    <option value="">Pilih</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="AB">AB</option>
                                                    <option value="O">O</option>
                                                </select>
                                                <InputError message={errors.bloodtype} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="numchilds" className="text-xs font-semibold">Jumlah Anak</Label>
                                                <Input id="numchilds" name="numchilds" type="number" defaultValue={candidate?.numchilds ?? ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.numchilds} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="nationality" className="text-xs font-semibold">Kewarganegaraan</Label>
                                                <Input id="nationality" name="nationality" defaultValue={candidate?.nationality || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.nationality} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="ethnic" className="text-xs font-semibold">Suku</Label>
                                                <Input id="ethnic" name="ethnic" defaultValue={candidate?.ethnic || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.ethnic} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="religion" className="text-xs font-semibold">Agama</Label>
                                                <Input id="religion" name="religion" defaultValue={candidate?.religion || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.religion} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="maritalid" className="text-xs font-semibold">Status Kawin</Label>
                                                <Input id="maritalid" name="maritalid" defaultValue={candidate?.maritalid || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.maritalid} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="location" className="text-xs font-semibold">Lokasi</Label>
                                                <Input id="location" name="location" defaultValue={candidate?.location || ''} className="h-10 rounded-lg" />
                                                <InputError message={errors.location} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                                            <div />
                                            <div className="flex gap-2">
                                                <Button type="submit" loading={processing} className="gap-1.5">
                                                    <Save className="size-4" />
                                                    Simpan Data Pribadi
                                                </Button>
                                                {!isLast && (
                                                    <Button type="button" onClick={goNext} variant="gradient" className="gap-1.5">
                                                        Selanjutnya
                                                        <ChevronRight className="size-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                )}

                {activeStep === 'education' && (
                    <Card className="border-[var(--border)]">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Pendidikan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {candidate?.educations && candidate.educations.length > 0 && (
                                <div className="space-y-2">
                                    {candidate.educations.map((edu) => (
                                        <div key={edu.id} className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 transition-colors hover:bg-[var(--background)]">
                                            <div>
                                                <p className="text-sm font-bold text-foreground">{edu.level} - {edu.institution_name}</p>
                                                <p className="text-xs text-muted-foreground">{edu.major} &bull; {edu.graduation_year} &bull; IPK: {edu.gpa}</p>
                                            </div>
                                            <Button variant="destructive" size="sm" className="gap-1" onClick={() => {
                                                if (confirm('Hapus pendidikan ini?')) {
                                                    router.delete(`/candidate/biodata/education/${edu.id}`);
                                                }
                                            }}>
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Form method="post" action="/candidate/biodata/education" className="space-y-4 rounded-xl border border-dashed border-[var(--border)] p-4">
                                {({ processing, errors }) => (
                                    <>
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                                            <Plus className="size-4 text-[var(--primary)]" />
                                            Tambah Pendidikan
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="level" className="text-xs font-semibold">Tingkat</Label>
                                                <select id="level" name="level" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                                    <option value="">Pilih</option>
                                                    <option value="SD">SD</option>
                                                    <option value="SMP">SMP</option>
                                                    <option value="SMA">SMA/SMK</option>
                                                    <option value="D3">D3</option>
                                                    <option value="S1">S1</option>
                                                    <option value="S2">S2</option>
                                                    <option value="S3">S3</option>
                                                </select>
                                                <InputError message={errors.level} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="institution_name" className="text-xs font-semibold">Nama Institusi</Label>
                                                <Input id="institution_name" name="institution_name" required className="h-10 rounded-lg" />
                                                <InputError message={errors.institution_name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="major" className="text-xs font-semibold">Jurusan</Label>
                                                <Input id="major" name="major" className="h-10 rounded-lg" />
                                                <InputError message={errors.major} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="graduation_year" className="text-xs font-semibold">Tahun Lulus</Label>
                                                <Input id="graduation_year" name="graduation_year" className="h-10 rounded-lg" />
                                                <InputError message={errors.graduation_year} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="gpa" className="text-xs font-semibold">IPK/NA</Label>
                                                <Input id="gpa" name="gpa" type="number" step="0.01" className="h-10 rounded-lg" />
                                                <InputError message={errors.gpa} />
                                            </div>
                                            <div className="flex items-end">
                                                <Button type="submit" loading={processing} className="w-full gap-1.5">
                                                    <Plus className="size-4" />
                                                    Tambah
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Form>
                            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                                <Button type="button" onClick={goPrev} variant="outline" className="gap-1.5">
                                    <ChevronLeft className="size-4" />
                                    Sebelumnya
                                </Button>
                                {!isLast && (
                                    <Button type="button" onClick={goNext} variant="gradient" className="gap-1.5">
                                        Selanjutnya
                                        <ChevronRight className="size-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeStep === 'experience' && (
                    <Card className="border-[var(--border)]">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Pengalaman Kerja</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {candidate?.experiences && candidate.experiences.length > 0 && (
                                <div className="space-y-2">
                                    {candidate.experiences.map((exp) => (
                                        <div key={exp.id} className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 transition-colors hover:bg-[var(--background)]">
                                            <div>
                                                <p className="text-sm font-bold text-foreground">{exp.company_name} - {exp.position}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {exp.start_date} s/d {exp.end_date} &bull; Gaji: {exp.last_salary}
                                                </p>
                                            </div>
                                            <Button variant="destructive" size="sm" className="gap-1" onClick={() => {
                                                if (confirm('Hapus pengalaman ini?')) {
                                                    router.delete(`/candidate/biodata/experience/${exp.id}`);
                                                }
                                            }}>
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Form method="post" action="/candidate/biodata/experience" className="space-y-4 rounded-xl border border-dashed border-[var(--border)] p-4">
                                {({ processing, errors }) => (
                                    <>
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                                            <Plus className="size-4 text-[var(--primary)]" />
                                            Tambah Pengalaman Kerja
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="company_name" className="text-xs font-semibold">Nama Perusahaan</Label>
                                                <Input id="company_name" name="company_name" className="h-10 rounded-lg" />
                                                <InputError message={errors.company_name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="position" className="text-xs font-semibold">Posisi</Label>
                                                <Input id="position" name="position" className="h-10 rounded-lg" />
                                                <InputError message={errors.position} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="start_date" className="text-xs font-semibold">Tanggal Mulai</Label>
                                                <Input id="start_date" name="start_date" type="date" className="h-10 rounded-lg" />
                                                <InputError message={errors.start_date} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="end_date" className="text-xs font-semibold">Tanggal Selesai</Label>
                                                <Input id="end_date" name="end_date" type="date" className="h-10 rounded-lg" />
                                                <InputError message={errors.end_date} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="supervisor_name" className="text-xs font-semibold">Nama Supervisor</Label>
                                                <Input id="supervisor_name" name="supervisor_name" className="h-10 rounded-lg" />
                                                <InputError message={errors.supervisor_name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="supervisor_phone" className="text-xs font-semibold">Telp Supervisor</Label>
                                                <Input id="supervisor_phone" name="supervisor_phone" className="h-10 rounded-lg" />
                                                <InputError message={errors.supervisor_phone} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="last_salary" className="text-xs font-semibold">Gaji Terakhir</Label>
                                            <Input id="last_salary" name="last_salary" className="h-10 rounded-lg" />
                                            <InputError message={errors.last_salary} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="job_description" className="text-xs font-semibold">Deskripsi Pekerjaan</Label>
                                            <Input id="job_description" name="job_description" className="h-10 rounded-lg" />
                                            <InputError message={errors.job_description} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="reason_for_leaving" className="text-xs font-semibold">Alasan Keluar</Label>
                                            <Input id="reason_for_leaving" name="reason_for_leaving" className="h-10 rounded-lg" />
                                            <InputError message={errors.reason_for_leaving} />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="submit" loading={processing} className="gap-1.5">
                                                <Plus className="size-4" />
                                                Tambah
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                                <Button type="button" onClick={goPrev} variant="outline" className="gap-1.5">
                                    <ChevronLeft className="size-4" />
                                    Sebelumnya
                                </Button>
                                {!isLast && (
                                    <Button type="button" onClick={goNext} variant="gradient" className="gap-1.5">
                                        Selanjutnya
                                        <ChevronRight className="size-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeStep === 'family' && (
                    <Card className="border-[var(--border)]">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Keluarga</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {candidate?.families && candidate.families.length > 0 && (
                                <div className="space-y-2">
                                    {candidate.families.map((fam) => (
                                        <div key={fam.id} className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 transition-colors hover:bg-[var(--background)]">
                                            <div>
                                                <p className="text-sm font-bold text-foreground">{fam.name} ({fam.relation_status})</p>
                                                <p className="text-xs text-muted-foreground">{fam.job} &bull; Lahir: {fam.dob}</p>
                                            </div>
                                            <Button variant="destructive" size="sm" className="gap-1" onClick={() => {
                                                if (confirm('Hapus anggota keluarga ini?')) {
                                                    router.delete(`/candidate/biodata/family/${fam.id}`);
                                                }
                                            }}>
                                                <Trash2 className="size-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Form method="post" action="/candidate/biodata/family" className="space-y-4 rounded-xl border border-dashed border-[var(--border)] p-4">
                                {({ processing, errors }) => (
                                    <>
                                        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                                            <Plus className="size-4 text-[var(--primary)]" />
                                            Tambah Keluarga
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="fam_name" className="text-xs font-semibold">Nama</Label>
                                                <Input id="fam_name" name="name" required className="h-10 rounded-lg" />
                                                <InputError message={errors.name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="relation_status" className="text-xs font-semibold">Hubungan</Label>
                                                <select id="relation_status" name="relation_status" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm" required>
                                                    <option value="">Pilih</option>
                                                    <option value="Suami">Suami</option>
                                                    <option value="Istri">Istri</option>
                                                    <option value="Anak">Anak</option>
                                                    <option value="Ayah">Ayah</option>
                                                    <option value="Ibu">Ibu</option>
                                                    <option value="Saudara">Saudara</option>
                                                </select>
                                                <InputError message={errors.relation_status} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="fam_gender" className="text-xs font-semibold">Jenis Kelamin</Label>
                                                <select id="fam_gender" name="gender" className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                                    <option value="">Pilih</option>
                                                    <option value="male">Laki-laki</option>
                                                    <option value="female">Perempuan</option>
                                                </select>
                                                <InputError message={errors.gender} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="fam_dob" className="text-xs font-semibold">Tanggal Lahir</Label>
                                                <Input id="fam_dob" name="dob" type="date" className="h-10 rounded-lg" />
                                                <InputError message={errors.dob} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="last_education" className="text-xs font-semibold">Pendidikan</Label>
                                                <Input id="last_education" name="last_education" className="h-10 rounded-lg" />
                                                <InputError message={errors.last_education} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="job" className="text-xs font-semibold">Pekerjaan</Label>
                                                <Input id="job" name="job" className="h-10 rounded-lg" />
                                                <InputError message={errors.job} />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="submit" loading={processing} className="gap-1.5">
                                                <Plus className="size-4" />
                                                Tambah
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>

                            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                                <Button type="button" onClick={goPrev} variant="outline" className="gap-1.5">
                                    <ChevronLeft className="size-4" />
                                    Sebelumnya
                                </Button>
                                {candidate?.status !== 'complete' && (
                                    <Form method="post" action="/candidate/biodata/complete">
                                        {({ processing }) => (
                                            <Button type="submit" loading={processing} variant="gradient" className="gap-1.5">
                                                <Check className="size-4" />
                                                Selesai & Kirim ke HRD
                                            </Button>
                                        )}
                                    </Form>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

CandidateBiodata.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/candidate' },
        { title: 'Biodata', href: '/candidate/biodata' },
    ],
};
