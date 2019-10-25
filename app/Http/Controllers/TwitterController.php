<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Status;
use Hash;
use Auth;
use Illuminate\Support\Facades\Storage;

class TwitterController extends Controller
{

    /* controller for page index */
    public function index(){
        /* get all status */
        $status = Status::all();

        return view('index', ['status'=>$status]);
    }
    
    /* controller for page login and register */
    public function login(){
        return view('auth.login');
    }

    /* controller for page profile */
    public function profile(){
        return view('profile');
    }

    /* controller post login */
    public function postlogin(Request $req){
        /* check email register */
        $getEmail = User::where('email', $req->email)->first();
        if(!$getEmail){
            $msg = array('error'=>1, 'message'=>'User not registered');
        }else{
            /* login */
            $credentials = $req->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $msg = array('error'=>0, 'message'=>'Login success');
            }else{
                $msg = array('error'=>1, 'message'=>'Failed to login');
            }
        }

        return json_encode($msg);
    }

    /* controller post login */
    public function postregister(Request $req){
        /* check email register */
        $getEmail = User::where('email', $req->email)->first();
        if($getEmail){
            $msg = array('error'=>1, 'message'=>'Email has been registered');
        }else{
            /* save user */
            $user = new User;
            $user->name = $req->name;
            $user->email = $req->email;
            $user->password = Hash::make($req->password);
            $user->url_foto = '';
            if($user->save()){
                /* login */
                $credentials = $req->only('email', 'password');
                if (Auth::attempt($credentials)) {
                    $msg = array('error'=>0, 'message'=>'User registered');
                }else{
                    $msg = array('error'=>1, 'message'=>'Failed to login');
                }
            }else{
                $msg = array('error'=>1, 'message'=>'Failed to register');
            }
        }

        return json_encode($msg);
    }

    /* controller logout */
    public function logout(){
        Auth::logout();
        return redirect('/login');
    }

    /* controller status */
    public function status(Request $req){
        /* save status */
        $status = new Status;
        $status->id_user = Auth::user()->id;
        $status->status = $req->status;
        if($status->save()){
            $msg = array('error'=>0, 'message'=>'Success to update status', 'nama'=>Auth::user()->name, 'foto'=>(empty(Auth::user()->url_foto) ? '/img/github-logo.png' : Auth::user()->url_foto), 'status'=>$req->status);
        }else{
            $msg = array('error'=>1, 'message'=>'Failed to update status');
        }

        return json_encode($msg);
    }

    /* controller post profil */
    public function postprofile(Request $req){
        /* get user update */
        $getUser = User::where('id', Auth::user()->id)->first();
        if($getUser){
            /* check email used */
            $checkEmail = User::where('email', $req->email)->first();
            if($checkEmail && ($checkEmail->id != $getUser->id)){
                $msg = array('error'=>1, 'message'=>'Email has been used');
            }else{
                /* destination foto */
                $destinationPath = 'public/upload/foto_profil';
                /* save update */
                $getUser->email = $req->email;
                $getUser->name = $req->name;
                if(!empty($req->password)){
                    $getUser->password = Hash::make($req->password);
                }
                if (!empty($req->file('foto'))) {
                    $path = $req->file('foto')->storeAs($destinationPath, date('Ymdhis').'_twitter.'.$req->file('foto')->getClientOriginalExtension());
                    $getUser->url_foto = $path;
                }

                if($getUser->save()){
                    $msg = array('error'=>0, 'message'=>'Success to updated');
                }else{
                    $msg = array('error'=>1, 'message'=>'Failed to updated');
                }
            }
        }else{
            $msg = array('error'=>1, 'message'=>'User not found');
        }

        return json_encode($msg);
    }


    /* controller all status */
    public function allstatus(){
        /* get all status */
        $status = Status::all();
        $status_all = [];
        foreach($status as $stat){
            $stat['foto'] = empty($stat->jUsers->url_foto) ? '/img/github-logo.png' : URL(Storage::url($stat->jUsers->url_foto));
            $stat['name'] = $stat->jUsers->name;
            array_push($status_all, $stat);
        }
        $msg = array('error'=>0, 'status'=>$status_all, 'id'=>Auth::user()->id);

        return json_encode($msg);
    }
}
