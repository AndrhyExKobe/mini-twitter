<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/login', ['as' => 'login', 'uses' => 'TwitterController@login']);
Route::post('/login', ['as' => 'Twitter.page.post.login', 'uses' => 'TwitterController@postlogin']);
Route::post('/register', ['as' => 'Twitter.page.register', 'uses' => 'TwitterController@postregister']);

Route::group(['middleware' => ['auth']], function () {
    Route::get('/', ['as' => 'Twitter.page.index', 'uses' => 'TwitterController@index']);
    Route::get('/logout', ['as' => 'Twitter.page.logout', 'uses' => 'TwitterController@logout']);
    Route::post('/status', ['as' => 'Twitter.page.status', 'uses' => 'TwitterController@status']);
    Route::get('/all-status', ['as' => 'Twitter.page.all-status', 'uses' => 'TwitterController@allstatus']);
    Route::get('/profile', ['as' => 'Twitter.page.profile', 'uses' => 'TwitterController@profile']);
    Route::post('/profile', ['as' => 'Twitter.page.post.profile', 'uses' => 'TwitterController@postprofile']);
});
