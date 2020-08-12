<?php
namespace App\Http\Controllers\API;
use App\Area;
use App\MapLocation;
use App\Photo;
use App\UserActivities;
use App\UserInfo;
use App\VerificationCode;
use http\Env\Response;
use http\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;
use Validator;
use DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;



class UserController extends Controller
{
    public $successStatus = 200;

    public function register(Request $request)
    {
        /*
         * email is optional for registration
         */
        if($request->email!=null){

            $validator = Validator::make($request->all(), [
                'email'      => 'required | email | regex:/\S+@\S+\.\S+/ | unique:users',
            ]);
            if ($validator->fails()){
                return response()->json(['message' => 'validation error', 'data'=>$validator->errors()], 401);
            }
        }


        $validator = Validator::make($request->all(), [
            'mobile'     => 'required | regex:/(01)[0-9]{9}/ | digits:11 | unique:users',
            'name'       => 'required | string | max:255',
            'password'   => 'required | string | min:8 ',
            'c_password' => 'required | same:password',
        ]);


        if ($validator->fails()) {
            //return 'not';
            return response()->json(['message' => 'validation error', 'data'=>$validator->errors()], 401);
        }


        $input = $request->all();

        $input['password'] = bcrypt($input['password']);
        //$input['email']
        $users = User::create($input);
        $success['id']    = $users->id;
        $success['name']  = $users->name;
        $success['token'] = $users->createToken('MyApp')-> accessToken;


        return response()->json(['message' => 'you are logged in', 'data'=>$success], $this-> successStatus);
    }


    /*
     * user can login by using either mobile no or email
     */
    public function login(){

        //return request('password');


        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['id']    = $user->id;
            $success['name']  = $user->name;
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            return response()->json(['message' => 'you are logged in', 'data' => $success], $this-> successStatus);
        }
        elseif (Auth::attempt(['mobile' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['id']    = $user->id;
            $success['name']  = $user->name;
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            return response()->json(['message' => 'you are logged in', 'data' => $success],  $this-> successStatus);
        }
        else{
            return response()->json(['message' => 'User Id or password is invalid'], 401);
        }
    }

    public function recoveryCode(Request $request){

        //return request('email');
        $validity = date_timestamp_get(date_create())+900;

        if(User::where('email', request('email'))->exists()){
            $user = User::where('email', request('email'))->get();
            $input=[
                'user_id'=>$user[0]['id'],
                'verification_code'=> '123456',
                'validity'=>$validity
            ];
            $verificationCode = VerificationCode::create($input);
            return response()->json(['message' => 'Verification code generated', 'data' => $verificationCode], $this-> successStatus);
        }
        elseif(User::where('mobile', request('email'))->exists()){
            $user = User::where('mobile', request('email'))->get();
            $input=[
                'user_id'=>$user[0]['id'],
                'verification_code'=> '123456',
                'validity'=>$validity
            ];
            $verificationCode = VerificationCode::create($input);
            return response()->json(['message' => 'Verification code generated', 'data' => $verificationCode], $this-> successStatus);        }
        else{
            return response()->json(['message' => 'User Id is invalid'], 401);
        }

    }


    public function passwordReset(Request $request){

        $validator = Validator::make($request->all(), [
            'password'   => 'required | string | min:8 ',
            'c_password' => 'required | same:password',
        ]);

        if ($validator->fails()) {
            //return 'not';
            return response()->json(['message' => 'validation error', 'data'=>$validator->errors()], 401);
        }

        $validity = date_timestamp_get(date_create());

        //return request('email');
        if(User::where('email', request('email'))->exists()){
            $user = User::where('email', request('email'))->get();
            $verificationCode = VerificationCode::select('validity')->where([['user_id','=', $user[0]['id']],['verification_code', '=', request('verification_code')]])->orderBy('id', 'desc')->first();
            if($verificationCode['validity']<$validity){
                $input = $request->all();
                $password=[
                    'password'=> bcrypt($input['password'])
                ];
                VerificationCode::where('user_id', $user[0]['id'])->delete();
                User::where('id',$user[0]['id'])->update($password);

            }
            return response()->json(['message' => 'Password Reset Successfully', $this-> successStatus]);
        }
        elseif(User::where('mobile', request('email'))->exists()){
            $user = User::where('mobile', request('email'))->get();
            $verificationCode = VerificationCode::select('validity')->where([['user_id','=', $user[0]['id']],['verification_code', '=', request('verification_code')]])->orderBy('id', 'desc')->first();
            if($verificationCode['validity']<$validity){
                $input = $request->all();
                $password=[
                    'password'=> bcrypt($input['password'])
                ];
                VerificationCode::where('user_id', $user[0]['id'])->delete();
                User::where('id',$user[0]['id'])->update($password);
            }
            return response()->json(['message' => 'Password Reset Successfully', $this-> successStatus]);
        }
        else{
            return response()->json(['message' => 'User Id is invalid'], 401);
        }

    }

    public function updatePassword(Request $request){
        $validator = Validator::make($request->all(), [
            'old_password'   => 'required | string | min:8 ',
            'new_password'   => 'required | string | min:8 ',
            'c_new_password' => 'required | same:new_password',
        ]);

        if ($validator->fails()) {
            //return 'not';
            return response()->json(['message' => 'validation error', 'data'=>$validator->errors()], 401);
        }

        $validity = date_timestamp_get(date_create());

        $id = Auth::user()->id;
        $input = $request->all();


        //return request('email');
        if(Auth::user(array('id' => $id, 'password' => $request->old_password))){
            $password=[
                'password'=> bcrypt($input['old_password'])
            ];
            User::where('id',$id)->update($password);

            return response()->json(['message' => 'Password Update Successfully', $this-> successStatus]);
        }
        else{
            return response()->json(['message' => 'Password invalid'], 401);
        }
    }

    public function logout(Request $request)
    {
        $id = $request->id;
        $accessToken = Auth::user()->token();
        //return response()->json(['data' => $accessToken]);
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        return response()->json([null,'data' => $accessToken], 204);
    }

}
