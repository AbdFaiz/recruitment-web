<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Division;
use App\Models\Echelon;
use App\Models\Grade;
use App\Models\JobVacancy;
use App\Models\Position;
use App\Models\Region;
use App\Models\Test;
use App\Models\TestQuestion;
use App\Models\Workunit;
use Illuminate\Database\Seeder;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        // Company
        $company = Company::create([
            'code' => 'CMP01',
            'name' => 'PT Maju Jaya',
            'slug' => 'pt-maju-jaya',
            'address' => 'Jl. Sudirman No. 100',
            'city' => 'Jakarta Selatan',
            'province' => 'DKI Jakarta',
            'phone' => '021-12345678',
            'website' => 'https://majujaya.com',
            'profile' => 'Perusahaan manufaktur terkemuka di Indonesia.',
            'status' => 'active',
        ]);

        // Region
        $region = Region::create([
            'regionid' => 'REG001',
            'name' => 'Jakarta',
            'slug' => 'jakarta',
            'address' => 'Jl. Thamrin No. 10',
            'city' => 'Jakarta Pusat',
            'province' => 'DKI Jakarta',
            'phone' => '021-87654321',
            'status' => 'active',
        ]);

        // Division
        $division = Division::create([
            'deptid' => 'DIV001',
            'deptname' => 'Information Technology',
            'companyid' => $company->id,
            'status' => 'active',
        ]);

        // Workunit
        $workunit = Workunit::create([
            'workunitid' => 'WU001',
            'workunitname' => 'IT Development',
            'companyid' => $company->id,
            'divisionid' => $division->id,
            'status' => 'active',
        ]);

        // Position
        $position = Position::create([
            'positionid' => 'POS001',
            'positionname' => 'Software Developer',
            'companyid' => $company->id,
            'divisionid' => $division->id,
            'workunitid' => $workunit->id,
            'status' => 'active',
            'level' => 'Staff',
        ]);

        $position2 = Position::create([
            'positionid' => 'POS002',
            'positionname' => 'System Administrator',
            'companyid' => $company->id,
            'divisionid' => $division->id,
            'workunitid' => $workunit->id,
            'status' => 'active',
            'level' => 'Staff',
        ]);

        // Grade
        Grade::create(['code' => 'G01', 'name' => 'Grade 1', 'status' => 'active']);
        Grade::create(['code' => 'G02', 'name' => 'Grade 2', 'status' => 'active']);

        // Echelon
        Echelon::create(['code' => 'E01', 'name' => 'Echelon 1', 'status' => 'active']);
        Echelon::create(['code' => 'E02', 'name' => 'Echelon 2', 'status' => 'active']);

        // Job Vacancies
        JobVacancy::create([
            'region_id' => $region->id,
            'position_id' => $position->id,
            'title' => 'Software Developer - Jakarta',
            'description' => 'Kami mencari software developer yang berpengalaman untuk bergabung dengan tim IT kami.',
            'requirements' => '- minimal S1 Informatika\n- pengalaman 2 tahun\n- menguasai PHP, Laravel, React',
            'employment_type' => 'full_time',
            'salary_min' => 8000000,
            'salary_max' => 15000000,
            'quota' => 3,
            'deadline' => now()->addDays(30),
            'status' => 'open',
        ]);

        JobVacancy::create([
            'region_id' => $region->id,
            'position_id' => $position2->id,
            'title' => 'System Administrator - Jakarta',
            'description' => 'Mencari sysadmin untuk mengelola infrastruktur server.',
            'requirements' => '- minimal S1 Teknik Informatika\n- pengalaman 1 tahun\n- menguasai Linux, Docker, AWS',
            'employment_type' => 'full_time',
            'salary_min' => 7000000,
            'salary_max' => 12000000,
            'quota' => 1,
            'deadline' => now()->addDays(30),
            'status' => 'open',
        ]);

        // Tests
        $psychotest = Test::create([
            'title' => 'Psikotest Dasar',
            'type' => 'psychotest',
            'description' => 'Tes kemampuan dasar: logika, numerik, verbal.',
            'duration_minutes' => 60,
            'passing_score' => 60,
            'is_active' => true,
        ]);

        $knowledgeTest = Test::create([
            'title' => 'Test Pengetahuan IT',
            'type' => 'knowledge',
            'description' => 'Tes pengetahuan umum IT dan programming.',
            'duration_minutes' => 45,
            'passing_score' => 70,
            'is_active' => true,
        ]);

        // Psychotest Questions
        TestQuestion::create([
            'test_id' => $psychotest->id,
            'question_text' => '1, 2, 4, 7, 11, ?',
            'type' => 'multiple_choice',
            'options' => ['14', '15', '16', '17'],
            'correct_answer' => '16',
            'order' => 1,
            'points' => 1,
        ]);

        TestQuestion::create([
            'test_id' => $psychotest->id,
            'question_text' => 'Jika semua Blip adalah Blop, dan semua Blop adalah Blop, maka semua Blip adalah Blop?',
            'type' => 'true_false',
            'options' => ['True', 'False'],
            'correct_answer' => 'True',
            'order' => 2,
            'points' => 1,
        ]);

        TestQuestion::create([
            'test_id' => $psychotest->id,
            'question_text' => 'Bilangan prima dari 1-10 ada berapa?',
            'type' => 'multiple_choice',
            'options' => ['3', '4', '5', '6'],
            'correct_answer' => '4',
            'order' => 3,
            'points' => 1,
        ]);

        // Knowledge Questions
        TestQuestion::create([
            'test_id' => $knowledgeTest->id,
            'question_text' => 'Apa itu PHP?',
            'type' => 'multiple_choice',
            'options' => ['Hypertext Preprocessor', 'Personal Home Page', 'Program Hosting Provider', 'Protocol Handler Protocol'],
            'correct_answer' => 'Hypertext Preprocessor',
            'order' => 1,
            'points' => 1,
        ]);

        TestQuestion::create([
            'test_id' => $knowledgeTest->id,
            'question_text' => 'SQL adalah bahasa untuk mengakses database?',
            'type' => 'true_false',
            'options' => ['True', 'False'],
            'correct_answer' => 'True',
            'order' => 2,
            'points' => 1,
        ]);
    }
}
