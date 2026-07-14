<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Candidate extends Model
{
    use SoftDeletes;

    protected $table = 'rec_candidates';

    protected $fillable = [
        'user_id', 'region_id', 'position_id', 'company_id', 'division_id',
        'workunit_id', 'echelon_id', 'grade_id', 'location',
        'nickname', 'citizenid', 'kkid', 'pob', 'dob',
        'address1', 'province1', 'city1', 'postcode1',
        'address2', 'province2', 'city2', 'postcode2',
        'email_personal', 'gender', 'homephone', 'handphone',
        'weight', 'height', 'bloodtype', 'blindcolor',
        'nationality', 'ethnic', 'religion', 'maritalid', 'numchilds',
        'typelicense1', 'drvlicense1', 'datelicense1',
        'typelicense2', 'drvlicense2', 'datelicense2',
        'photo', 'cv_file', 'status',
    ];

    protected function casts(): array
    {
        return [
            'dob' => 'date',
            'datelicense1' => 'date',
            'datelicense2' => 'date',
            'weight' => 'integer',
            'height' => 'integer',
            'blindcolor' => 'boolean',
            'numchilds' => 'integer',
            'postcode1' => 'integer',
            'postcode2' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function workunit(): BelongsTo
    {
        return $this->belongsTo(Workunit::class, 'workunit_id');
    }

    public function echelon(): BelongsTo
    {
        return $this->belongsTo(Echelon::class, 'echelon_id');
    }

    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class, 'grade_id');
    }

    public function educations(): HasMany
    {
        return $this->hasMany(CandidateEducation::class, 'candidate_id');
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(CandidateExperience::class, 'candidate_id');
    }

    public function families(): HasMany
    {
        return $this->hasMany(CandidateFamily::class, 'candidate_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'candidate_id');
    }

    public function application(): HasOne
    {
        return $this->hasOne(Application::class, 'candidate_id');
    }

    public function isComplete(): bool
    {
        return $this->status === 'complete';
    }
}
