function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img-profile')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

/* post form login */
$('#frm-login').submit(function(e){
    e.preventDefault();

    var pattern_email = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
    formDT = new FormData();

    $(this).find('button').html('Loading...');
    $(this).find('button').addClass('disabled');

    if($('input[name="email"]').val() === '' ||
        !pattern_email.test($('input[name="email"]').val()) ||
        $('input[name="password"]').val() == ''
        ){

        if($('input[name="email"]').val() == ''){
            $('input[name="email"]').parent('div').addClass('error');
            $('input[name="email"]').parent('div').find('.error-input').html('Email is empty');
        }else if(!pattern_email.test($('input[name="email"]').val())){
            $('input[name="email"]').parent('div').addClass('error');
            $('input[name="email"]').parent('div').find('.error-input').html('Email not valid');
        }else{
            $('input[name="email"]').parent('div').removeClass('error');
            $('input[name="email"]').parent('div').find('.error-input').html('');
        }

        if($('input[name="password"]').val() == ''){
            $('input[name="password"]').parent('div').addClass('error');
            $('input[name="password"]').parent('div').find('.error-input').html('Password is empty');
        }else{
            $('input[name="password"]').parent('div').removeClass('error');
            $('input[name="password"]').parent('div').find('.error-input').html('');
        }

        $(this).find('button').html('Login');
        $(this).find('button').removeClass('disabled');
    }else{
        formDT.append('email', $('input[name="email"]').val());
        formDT.append('password', $('input[name="password"]').val());
        formDT.append('_token', $('input[name="_token"]').val());
        /* pengiriman by ajax */
        $.ajax({
            url: "/login",
            type: 'POST',
            data: formDT,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                msg = $.parseJSON(data);
                $('#frm-login').find('button').html('Login');
                $('#frm-login').find('button').removeClass('disabled');
                if(msg.error == 0){
                    $('#frm-login').find('.alert').addClass('alert-success');
                    $('#frm-login').find('.alert span').html('Login Success');

                    setTimeout(function() {
                        location.href = '/';
                    }, 2000);
                }else{
                    $('#frm-login').find('.alert').addClass('alert-danger');
                    $('#frm-login').find('.alert span').html('Login Failed');
                }
            },
            error: function(response){
                $('#frm-login').find('.alert').addClass('alert-danger');
                $('#frm-login').find('.alert span').html('Something wrong. Please try again.');
                $('#frm-login').find('button').html('Login');
                $('#frm-login').find('button').removeClass('disabled');
            }
        });
    }
});

/* disable keypress enter untuk login */
$('input[name="password"]').keypress(function( event ) {
    if ( event.which == 13 ) {
        e.preventDefault();
    }
});

/* post untuk register */
$('#frm-register').submit(function(e){
    e.preventDefault();

    var pattern_email = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
    formDT = new FormData();

    $(this).find('button').html('Loading...');
    $(this).find('button').addClass('disabled');

    if($('input[name="email-reg"]').val() === '' ||
        !pattern_email.test($('input[name="email-reg"]').val()) ||
        $('input[name="name-reg"]').val() === '' ||
        $('input[name="password-reg"]').val() == ''
        ){

        if($('input[name="email-reg"]').val() == ''){
            $('input[name="email-reg"]').parent('div').addClass('error');
            $('input[name="email-reg"]').parent('div').find('.error-input').html('Email is empty');
        }else if(!pattern_email.test($('input[name="email-reg"]').val())){
            $('input[name="email-reg"]').parent('div').addClass('error');
            $('input[name="email-reg"]').parent('div').find('.error-input').html('Email not valid');
        }else{
            $('input[name="email-reg"]').parent('div').removeClass('error');
            $('input[name="email-reg"]').parent('div').find('.error-input').html('');
        }

        if($('input[name="name-reg"]').val() == ''){
            $('input[name="name-reg"]').parent('div').addClass('error');
            $('input[name="name-reg"]').parent('div').find('.error-input').html('Name is empty');
        }else{
            $('input[name="name-reg"]').parent('div').removeClass('error');
            $('input[name="name-reg"]').parent('div').find('.error-input').html('');
        }

        if($('input[name="password-reg"]').val() == ''){
            $('input[name="password-reg"]').parent('div').addClass('error');
            $('input[name="password-reg"]').parent('div').find('.error-input').html('Password is empty');
        }else{
            $('input[name="password-reg"]').parent('div').removeClass('error');
            $('input[name="password-reg"]').parent('div').find('.error-input').html('');
        }

        $(this).find('button').html('Register');
        $(this).find('button').removeClass('disabled');
    }else{

        formDT.append('email', $('input[name="email-reg"]').val());
        formDT.append('password', $('input[name="password-reg"]').val());
        formDT.append('name', $('input[name="name-reg"]').val());
        formDT.append('_token', $('input[name="_token"]').val());
        /* pengiriman untuk register */
        $.ajax({
            url: "/register",
            type: 'POST',
            data: formDT,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                msg = $.parseJSON(data);
                $('#frm-register').find('button').html('Register');
                $('#frm-register').find('button').removeClass('disabled');
                if(msg.error == 0){
                    $('#frm-register').find('.alert').addClass('alert-success');
                    $('#frm-register').find('.alert span').html(msg.message);

                    setTimeout(function() {
                        location.href = '/';
                    }, 2000);
                }else{
                    $('#frm-register').find('.alert').addClass('alert-danger');
                    $('#frm-register').find('.alert span').html(msg.message);
                }
            },
            error: function(response){
                $('#frm-register').find('.alert').addClass('alert-danger');
                $('#frm-register').find('.alert span').html('Something wrong. Please try again.');
                $('#frm-register').find('button').html('Register');
                $('#frm-register').find('button').removeClass('disabled');
            }
        });
    }
});

/* disabled keypress enter untuk register */
$('input[name="password-reg"]').keypress(function( event ) {
    if ( event.which == 13 ) {
        e.preventDefault();
    }
});

/* pengiriman untuk update status */
$('#frm-status').submit(function(e){
    e.preventDefault();

    formDT = new FormData();

    $(this).find('button').html('Loading...');
    $(this).find('button').addClass('disabled');

    if($('input[name="status"]').val() === ''
        ){

        if($('input[name="status"]').val() == ''){
            $('input[name="status"]').parent('div').addClass('error');
            $('input[name="status"]').parent('div').find('.error-input').html('Status is empty');
        }else{
            $('input[name="status"]').parent('div').removeClass('error');
            $('input[name="status"]').parent('div').find('.error-input').html('');
        }

        $(this).find('button').html('Update');
        $(this).find('button').removeClass('disabled');
    }else{
        formDT.append('status', $('input[name="status"]').val());
        formDT.append('_token', $('input[name="_token"]').val());
        $.ajax({
            url: "/status",
            type: 'POST',
            data: formDT,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                msg = $.parseJSON(data);
                $('input[name="status"]').parent('div').removeClass('error');
                $('input[name="status"]').parent('div').find('.error-input').html('');
                $('input[name="status"]').val('');
                $('#frm-status').find('button').html('Update');
                $('#frm-status').find('button').removeClass('disabled');
                if(msg.error == 0){
                    $('#frm-status').find('.alert').addClass('alert-success');
                    $('#frm-status').find('.alert span').html(msg.message);

                    setTimeout(function() {
                        $('#frm-status').find('.alert').removeClass('alert-success');
                        $('#frm-status').find('.alert span').html('');
                        $('#list-status').append(`
                        <div class="status me">
                            <div class="status-img">
                                <img src="`+msg.foto+`" alt="status image">
                            </div>
                            <div class="status-text">
                                <div class="title">`+msg.nama+`</div>
                                <div class="content">`+msg.status+`</div>
                            </div>
                        </div>
                        `)
                    }, 1000);
                }else{
                    $('#frm-status').find('.alert').addClass('alert-danger');
                    $('#frm-status').find('.alert span').html(msg.message);
                    setTimeout(function() {
                        $('#frm-status').find('.alert').removeClass('alert-danger');
                        $('#frm-status').find('.alert span').html('');
                    }, 1000);
                }
            },
            error: function(response){
                $('#frm-status').find('.alert').addClass('alert-danger');
                $('#frm-status').find('.alert span').html('Something wrong. Please try again.');
                $('#frm-status').find('button').html('Update');
                $('#frm-status').find('button').removeClass('disabled');
            }
        });
    }
});

/* keypress enter untuk update status */
$('input[name="status"]').keypress(function( event ) {
    /* if ( event.which == 13 ) {
        $('#frm-status').submit();
    } */
});

/* update profil */
$('#frm-profil').submit(function(e){
    e.preventDefault();

    var pattern_email = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
    formDT = new FormData(),
    img_profil = ($('#myPhoto').prop('files')[0] === undefined) ? 'null' : $('#myPhoto').prop('files')[0];;

    $(this).find('button').html('Loading...');
    $(this).find('button').addClass('disabled');

    if($('input[name="email-prof"]').val() === '' ||
        !pattern_email.test($('input[name="email-prof"]').val()) ||
        $('input[name="name-prof"]').val() === '' 
        ){

        if($('input[name="email-prof"]').val() == ''){
            $('input[name="email-prof"]').parent('div').addClass('error');
            $('input[name="email-prof"]').parent('div').find('.error-input').html('Email is empty');
        }else if(!pattern_email.test($('input[name="email-prof"]').val())){
            $('input[name="email-prof"]').parent('div').addClass('error');
            $('input[name="email-prof"]').parent('div').find('.error-input').html('Email not valid');
        }else{
            $('input[name="email-prof"]').parent('div').removeClass('error');
            $('input[name="email-prof"]').parent('div').find('.error-input').html('');
        }

        if($('input[name="name-prof"]').val() == ''){
            $('input[name="name-prof"]').parent('div').addClass('error');
            $('input[name="name-prof"]').parent('div').find('.error-input').html('Name is empty');
        }else{
            $('input[name="name-prof"]').parent('div').removeClass('error');
            $('input[name="name-prof"]').parent('div').find('.error-input').html('');
        }


        $(this).find('button').html('Save');
        $(this).find('button').removeClass('disabled');
    }else{
        formDT.append('email', $('input[name="email-prof"]').val());
        formDT.append('password', $('input[name="password-prof"]').val());
        formDT.append('name', $('input[name="name-prof"]').val());
        formDT.append('foto', img_profil);
        formDT.append('_token', $('input[name="_token"]').val());
        $.ajax({
            url: "/profile",
            type: 'POST',
            data: formDT,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                msg = $.parseJSON(data);
                $('#frm-profil').find('button').html('Save');
                $('#frm-profil').find('button').removeClass('disabled');
                if(msg.error == 0){
                    $('#frm-profil').find('.alert').addClass('alert-success');
                    $('#frm-profil').find('.alert span').html(msg.message);

                    setTimeout(function() {
                        location.href = '/profile';
                    }, 2000);
                }else{
                    $('#frm-profil').find('.alert').addClass('alert-danger');
                    $('#frm-profil').find('.alert span').html(msg.message);
                }
            },
            error: function(response){
                $('#frm-profil').find('.alert').addClass('alert-danger');
                $('#frm-profil').find('.alert span').html('Something wrong. Please try again.');
                $('#frm-profil').find('button').html('Save');
                $('#frm-profil').find('button').removeClass('disabled');
            }
        });
    }
});

