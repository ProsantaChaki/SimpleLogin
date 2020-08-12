<?php

use App\Role;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Auth::routes();

Route::get('users', 'UserController@getUsers')->middleware('auth:api');

/*
 *
 */

Route::post('v1/login', 'API\UserController@login');
Route::post('v1/register', 'API\UserController@register');
Route::post('v1/password/recovery', 'API\UserController@recoveryCode');
Route::post('v1/password/reset', 'API\UserController@passwordReset');

Route::post('v1/products/create','API\ProductsController@create');
Route::post('v1/products/update/{postId}','API\ProductsController@updatePost');

Route::group(['middleware' => 'auth:api'], function(){

    Route::get('v1/logout/{id}','API\UserController@logout');

    Route::post('v1/password/change','API\UserController@updatePassword');


});
