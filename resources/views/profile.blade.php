@extends('layouts.app')

@section('content')

<div class="col s12">
    <div class="col s4 center-div inline div-img-profil" >
        <img id="img-profile" src="{{ empty(Auth::user()->url_foto) ? '/img/github-logo.png' : URL(Storage::url(Auth::user()->url_foto)) }}" alt="your image" />
        <div class="upload-btn-wrapper field-button">
            <button class="btn white">Upload a file</button>
            <input type="file" name="myPhoto" id="myPhoto" onchange="readURL(this);" />
        </div>
    </div>
    <div class="col s6 back-gray inline">
        <form action="" id="frm-profil">
            @csrf()
            <div class="field-text">
                <input type="text" name="name-prof" id="nama" placeholder="Name" value="{{Auth::user()->name}}">
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <input type="email" name="email-prof" id="email" placeholder="Email" value="{{Auth::user()->email}}">
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <input type="password" name="password-prof" id="password" placeholder="New Password">
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <div class="alert">
                    <span></span>
                </div>
            </div>
            <div class="field-button right">
                <button class="btn">Save</button>
                <a href="/logout" class="btn red">Logout</a>
            </div>
        </form>
    </div>

    
</div>

@endsection