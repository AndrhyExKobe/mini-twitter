@extends('layouts.app')

@section('content')

<div class="col s12">
    <div class="col s6 center-div back-gray">
        <form action="" id="frm-status">
        @csrf()
            <div class="field-text">
                <input type="text" name="status" id="status" placeholder="Update Status...">
                <div class="error-input"></div>
            </div>
            <div class="field-text">
                <div class="alert">
                    <span></span>
                </div>
            </div>
            <div class="field-button right">
                <button class="btn">Update</button>
            </div>
        </form>
    </div>

    <div class="col s6 center-div" id="list-status">
        @foreach($status as $key => $stat)
        @if($stat->id_user == auth()->user()->id)
        <div class="status me">
            <div class="status-img">
                <img src="{{ empty(Auth::user()->url_foto) ? '/img/github-logo.png' : URL(Storage::url(Auth::user()->url_foto)) }}" alt="status image">
            </div>
            <div class="status-text">
                <div class="title">{{Auth::user()->name}}</div>
                <div class="content">{{$stat->status}}</div>
            </div>
        </div>
        @else
        <div class="status">
            <div class="status-img">
                <img src="{{ empty($stat->jUsers->url_foto) ? '/img/github-logo.png' : URL(Storage::url($stat->jUsers->url_foto)) }}" alt="status image">
            </div>
            <div class="status-text">
                <div class="title">{{$stat->jUsers->name}}</div>
                <div class="content">{{$stat->status}}</div>
            </div>
        </div>
        @endif
        @endforeach
    </div>
    
</div>

<script src="{{ asset('js/chat.js') }}" defer></script>
@endsection