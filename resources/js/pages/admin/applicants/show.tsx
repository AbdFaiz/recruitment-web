import { Head, Form, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Education = {
    id: number;
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    gpa: number;
};

type Experience = {
    id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
};

type Family = {
    id: number;
    name: string;
    relationship: string;
    occupation: string;
    phone: string;
};

type TestResult = {
    id: number;
    score: number;
    passed: boolean;
    taken_at: string;
    test: { title: string; type: string };
};

type TestAnswer = {
    id: number;
    answer: string;
    is_correct: boolean;
    points: number;
    question: { question_text: string; correct_answer: string; points: number };
};

type Candidate = {
    id: number;
    user: {
        name: string;
        email: string;
    };
    phone: string;
    address: string;
    date_of_birth: string;
    gender: string;
    education: Education[];
    experiences: Experience[];
    families: Family[];
};

type Vacancy = {
    id: number;
    title: string;
    region: { name: string } | null;
    position: { positionname: string } | null;
};

type Application = {
    id: number;
    status: string;
    applied_at: string;
    candidate: Candidate;
    vacancy: Vacancy;
    testResults: TestResult[];
    testAnswers: TestAnswer[];
};

type Props = { application: Application };

const statusColors: Record<string, string> = {
    submitted: 'bg-blue-100 text-blue-800',
    reviewing: 'bg-yellow-100 text-yellow-800',
    testing: 'bg-purple-100 text-purple-800',
    interview: 'bg-indigo-100 text-indigo-800',
    offered: 'bg-green-100 text-green-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

export default function ApplicantsShow({ application }: Props) {
    const candidate = application.candidate;
    const user = candidate.user;

    return (
        <>
            <Head title={`Detail Pelamar - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Heading title="Detail Pelamar" variant="hero">
                    <Link href="/admin/applicants">
                        <Button variant="outline">Kembali</Button>
                    </Link>
                </Heading>

                {/* Personal Data */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Data Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                                <p className="font-medium">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Telepon</p>
                                <p className="font-medium">{candidate.phone || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                                <p className="font-medium">{candidate.gender || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                                <p className="font-medium">{candidate.date_of_birth || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Alamat</p>
                                <p className="font-medium">{candidate.address || '-'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Vacancy Applied */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Lowongan yang Dilamar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Judul Lowongan</p>
                                <p className="font-medium">{application.vacancy?.title || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Region</p>
                                <p className="font-medium">{application.vacancy?.region?.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Position</p>
                                <p className="font-medium">{application.vacancy?.position?.positionname || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tanggal Lamar</p>
                                <p className="font-medium">{application.applied_at}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Education */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Pendidikan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {candidate.education.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Tidak ada data pendidikan.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Institusi</TableHead>
                                        <TableHead>Gelar</TableHead>
                                        <TableHead>Jurusan</TableHead>
                                        <TableHead>Mulai</TableHead>
                                        <TableHead>Selesai</TableHead>
                                        <TableHead>IPK</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {candidate.education.map((edu) => (
                                        <TableRow key={edu.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{edu.institution}</TableCell>
                                            <TableCell>{edu.degree}</TableCell>
                                            <TableCell>{edu.field_of_study}</TableCell>
                                            <TableCell>{edu.start_date}</TableCell>
                                            <TableCell>{edu.end_date || 'Sekarang'}</TableCell>
                                            <TableCell>{edu.gpa || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Experience */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Pengalaman Kerja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {candidate.experiences.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Tidak ada data pengalaman.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Perusahaan</TableHead>
                                        <TableHead>Posisi</TableHead>
                                        <TableHead>Mulai</TableHead>
                                        <TableHead>Selesai</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {candidate.experiences.map((exp) => (
                                        <TableRow key={exp.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{exp.company_name}</TableCell>
                                            <TableCell>{exp.position}</TableCell>
                                            <TableCell>{exp.start_date}</TableCell>
                                            <TableCell>{exp.end_date || 'Sekarang'}</TableCell>
                                            <TableCell className="max-w-xs truncate">{exp.description || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Family */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Keluarga</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {candidate.families.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Tidak ada data keluarga.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Hubungan</TableHead>
                                        <TableHead>Pekerjaan</TableHead>
                                        <TableHead>Telepon</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {candidate.families.map((family) => (
                                        <TableRow key={family.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{family.name}</TableCell>
                                            <TableCell>{family.relationship}</TableCell>
                                            <TableCell>{family.occupation || '-'}</TableCell>
                                            <TableCell>{family.phone || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Test Results */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Hasil Tes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {application.testResults.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Belum ada hasil tes.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tes</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Lulus</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {application.testResults.map((result) => (
                                        <TableRow key={result.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{result.test?.title || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{result.test?.type || '-'}</Badge>
                                            </TableCell>
                                            <TableCell>{result.score}</TableCell>
                                            <TableCell>
                                                <Badge variant={result.passed ? 'success' : 'destructive'}>
                                                    {result.passed ? 'Lulus' : 'Tidak Lulus'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{result.taken_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Test Answers */}
                {application.testAnswers.length > 0 && (
                    <Card className="border-[var(--border)]">
                        <CardHeader>
                            <CardTitle>Jawaban Tes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Pertanyaan</TableHead>
                                        <TableHead>Jawaban</TableHead>
                                        <TableHead>Jawaban Benar</TableHead>
                                        <TableHead>Benar</TableHead>
                                        <TableHead>Poin</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {application.testAnswers.map((answer, index) => (
                                        <TableRow key={answer.id} className="hover:bg-[var(--accent)]">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="max-w-md truncate">{answer.question?.question_text || '-'}</TableCell>
                                            <TableCell>{answer.answer}</TableCell>
                                            <TableCell>{answer.question?.correct_answer || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={answer.is_correct ? 'success' : 'destructive'}>
                                                    {answer.is_correct ? 'Benar' : 'Salah'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{answer.points}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Status Update Form */}
                <Card className="border-[var(--border)]">
                    <CardHeader>
                        <CardTitle>Update Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form method="put" action={`/admin/applicants/${application.id}/status`} className="space-y-4">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status Lamaran</Label>
                                        <select id="status" name="status" defaultValue={application.status} className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-1 text-sm">
                                            <option value="submitted">Submitted</option>
                                            <option value="reviewing">Reviewing</option>
                                            <option value="testing">Testing</option>
                                            <option value="interview">Interview</option>
                                            <option value="offered">Offered</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                        <InputError message={errors.status} />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="submit" loading={processing}>
                                            Update Status
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

ApplicantsShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Pelamar', href: '/admin/applicants' },
        { title: 'Detail', href: '#' },
    ],
};
