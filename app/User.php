<?php


namespace App;

use App\OauthAccessToken;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'mobile',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function photo(){
        return $this->morphMany('App\Photo', "imageable");
    }

    public function AauthAcessToken(){
        return $this->hasMany('\App\OauthAccessToken');
    }

    public function userinfo()
    {
        return $this->hasOne('App\UserInfo');
    }
    public function photos()
    {
        return $this->hasOneThrough(
            'App\Photo',
            'App\UserInfo',
            'user_id', // Foreign key on cars table...
            'id', // Foreign key on owners table...
            'id', // Local key on mechanics table...
            'photo_id' // Local key on cars table...
        );
    }
    public function area()
    {
        return $this->hasOneThrough(
            'App\Area',
            'App\UserInfo',
            'user_id', // Foreign key on cars table...
            'id', // Foreign key on owners table...
            'id', // Local key on mechanics table...
            'area_id' // Local key on cars table...
        );
    }
}
