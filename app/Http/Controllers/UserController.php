<?php

namespace App\Http\Controllers;

use App\Photo;
use Illuminate\Http\Request;
use Auth;
use hash;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //  to display all information about user



        $user = Auth::user();

        //return $user;

        return view('user.profile.update', compact('user'));


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        /*
                 $roles = Role::pluck('name','id')->all();
                return view('admin.users.create', compact('roles'));
        */
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        //



        /*
                if(trim($request->password) == ''){
                    $input = $request->except('password');

                } else{
                    $input = $request->all();
                    $input['password'] = bcrypt($request->password);
                }

                if($file = $request->file('photo_id')) {
                    $name = time() . $file->getClientOriginalName();
                    $file->move('images', $name);
                    $photo = Photo::create(['file'=>$name]);
                    $input['photo_id'] = $photo->id;
                }

                User::create($input);
                return redirect('/admin/users');
        //        return $request->all();



        */



    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {

        return view('layouts.userLayout');
        //
        /*
                return view('admin.uses.show');
        */
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        /*$user = Auth::user();
        return view('users.edit', compact('user'));
        */

                $user = User::findOrFail($id);
                //$roles = Role::pluck('name','id')->all();
                return view('user.profile.update', compact('user'/*,'roles'*/));



    }

    /*
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        //
        $userinfo = user::findorfail($user);


        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$user,

        ]);

        if($file = $request->image) {
            //return $file;
            $name = time() . $file->getClientOriginalName();
            //return $name;
            $file->move('images', $name);

            $photo = Photo::create([
                'path' => $name,
                'imageable_id' => $user,
                'imageable_type'=> 'App/User'
            ]);
            return $photo->id;

            //$input['path'] = $photo->id;

        }

        $userinfo->name = request('name');
        $userinfo->email = request('email');

        $userinfo->save();

        return back();
        /*
                $user = User::findOrFail($id);
                if(trim($request->password) == ''){
                    $input = $request->except('password');
                } else{
                    $input = $request->all();
                    $input['password'] = bcrypt($request->password);

                }




                if($file = $request->file('photo_id')){
                    $name = time() . $file->getClientOriginalName();
                    $file->move('images', $name);
                    $photo = Photo::create(['file'=>$name]);
                    $input['photo_id'] = $photo->id;


                }



                $user->update($input);
                return redirect('/admin/users');
        */
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        /*
                $user = User::findOrFail($id);
                unlink(public_path() . $user->photo->file);
                $user->delete();
                Session::flash('deleted_user','The user has been deleted');
                return redirect('/admin/users');
        */
    }
}
