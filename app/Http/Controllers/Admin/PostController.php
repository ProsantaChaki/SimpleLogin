<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Post;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\DocBlock\Tags\Uses;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\User;


class PostController extends Controller{

    public function createRole(){

        $role = Role::create(['name' => 'super admin']);
        $permission = Permission::create(['name' => 'edit post']);
        $role->givePermissionTo($permission);
        $permission->assignRole($role);
    }


    public function index()
    {
        abort_unless(\Gate::allows('user_access'), 403);

        $posts = Post::get();

        //return $post;

        return view('admin.posts.index', compact('posts'));
    }

    public function create()
    {
        return back();

        abort_unless(\Gate::allows('user_create'), 403);

        $roles = Role::all()->pluck('name', 'id');

        return view('admin.admins.create', compact('roles'));
    }

    public function store(StoreUserRequest $request)
    {
        abort_unless(\Gate::allows('user_create'), 403);

        $user = Admin::create($request->all());
        $user->roles()->sync($request->input('roles', []));

        return redirect()->route('admin.admin.index');
    }

    public function edit(User $user)
    {
        abort_unless(\Gate::allows('user_edit'), 403);

        $user->load('roles');

        return view('admin.users.edit', compact( 'user'));
    }

    public function update(UpdateUserRequest $request, Admin $admin)
    {
        return back();
        $user = $admin;
        abort_unless(\Gate::allows('user_edit'), 403);
        //if($request->password == null) unset($request->password);
        if (empty($request->password)){
            unset($request['password']);
        }

        //return $request->all();

        $user->update($request->all());
        $user->roles()->sync($request->input('roles', []));

        return redirect()->route('admin.admin.index');
    }

    public function show(User $user)
    {
        //return json_encode($user->userinfo());
        abort_unless(\Gate::allows('user_show'), 403);

        $user = User::with('userinfo','photos','area')->get();

        $user= $user[0];

        //return $user;

        return view('admin.users.show', compact('user'));
    }

    public function destroy(User $user)
    {
        //return $user;
        return back();

        abort_unless(\Gate::allows('user_delete'), 403);

        $admin->delete();

        return back();
    }

    public function massDestroy(MassDestroyUserRequest $request)
    {
        User::whereIn('id', request('ids'))->delete();

        return response(null, 204);
    }


}
