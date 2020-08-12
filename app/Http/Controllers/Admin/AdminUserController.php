<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Admin;


class AdminUserController extends Controller{

    public function createRole(){

        $role = Role::create(['name' => 'super admin']);
        $permission = Permission::create(['name' => 'edit post']);
        $role->givePermissionTo($permission);
        $permission->assignRole($role);
    }


    public function index()
    {
        abort_unless(\Gate::allows('user_access'), 403);

        $users = Admin::with('roles')->get();

        return view('admin.admins.index', compact('users'));
    }

    public function create()
    {
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

    public function edit(Admin $admin)
    {
        $user =$admin;
        abort_unless(\Gate::allows('user_edit'), 403);

        $roles = Role::all()->pluck('name', 'id');

        $user->load('roles');

        return view('admin.admins.edit', compact('roles', 'user'));
    }

    public function update(UpdateUserRequest $request, Admin $admin)
    {
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

    public function show(Admin $admin)
    {
        $user =  $admin;
        abort_unless(\Gate::allows('user_show'), 403);

        $admin->load('roles');

        return view('admin.admins.show', compact('user'));
    }

    public function destroy(Admin $admin)
    {
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
