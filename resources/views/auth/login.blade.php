@extends('layouts.app')

@section('content')

<div class="col s12">
    <div class="col s4 center-div">
        <h3>LOGIN</h3>
        <form action="" id="frm-login" method="post">
            @csrf()
            <div class="field-text">
                <input type="email" name="email" id="email" placeholder="Email" >
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <input type="password" name="password" id="password" placeholder="Password" >
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <div class="alert">
                    <span></span>
                </div>
            </div>
            <div class="field-button center">
                <button type="submit" class="btn">Login</button>
            </div>
        </form>
    </div>
    <div class="separator"></div>
    <div class="col s4 center-div">
        <h3>REGISTER</h3>
        <form action="" id="frm-register" method="post">
            <div class="field-text">
                <input type="text" name="email-reg" id="email" placeholder="Email" >
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <input type="text" name="name-reg" id="name" placeholder="Name" >
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <input type="password" name="password-reg" id="password" placeholder="Password" >
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <div class="alert">
                    <span></span>
                </div>
            </div>
            <div class="field-button center">
                <button type="submit" class="btn">Register</button>
            </div>
        </form>
    </div>
</div>

@endsection