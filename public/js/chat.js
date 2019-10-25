/* refresh halaman chat */
$(document).ready(function() {
    setInterval(function() {
        $('#list-status').empty();

        $.ajax({
            url: "/all-status",
            type: 'GET',
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                msg = $.parseJSON(data);
                if(msg.error == 0){
                    $.each(msg.status, function( index, value ) {
                        if(msg.id == value.id_user){
                            $('#list-status').append(`
                            <div class="status me">
                                <div class="status-img">
                                    <img src="`+value.foto+`" alt="status image">
                                </div>
                                <div class="status-text">
                                    <div class="title">`+value.name+`</div>
                                    <div class="content">`+value.status+`</div>
                                </div>
                            </div>
                            `);
                        }else{
                            $('#list-status').append(`
                            <div class="status">
                                <div class="status-img">
                                    <img src="`+value.foto+`" alt="status image">
                                </div>
                                <div class="status-text">
                                    <div class="title">`+value.name+`</div>
                                    <div class="content">`+value.status+`</div>
                                </div>
                            </div>
                            `);
                        }
                    });
                    
                }
            },
            error: function(response){
                $('#frm-status').find('.alert').addClass('alert-danger');
                $('#frm-status').find('.alert span').html('Something wrong. Please try again.');
                $('#frm-status').find('button').html('Update');
                $('#frm-status').find('button').removeClass('disabled');
            }
        });
        console.clear();
    }, 5000); // the "5000" here refers to the time to refresh the div. it is in milliseconds.
});