(function($){
    $(processVideo);
    function processVideo(){
        var $submit = $('#submit');
        var $name = $('#name');
        var $user = $('#user');
        var $messageErrList = $('#messageErr');
        var $showInfo = $('#showInfo');
        var $reset = $('#Reset');

        $submit.click(validFormVideo);
        $reset.click(resetDataBase);

        function validFormVideo(e){
            e.preventDefault(e);//tắt sự kiện submit form 
            var name = $name.val();
            var user = $user.val();
            var $getValidForm = $.ajax({
                type: "post",
                url: "video/get-err-form",
                dataType: "json",
                data:{name: name, user: user},
            });

            $getValidForm.then(function(messageErrs){
                //console.log(messageErrs);
                var displayMessage = "";

                if(!messageErrs.success){
                    $.each(messageErrs.listErr,function(messageFeild,messageErr){
                        $.each(messageErr,function(stt,message){
                            displayMessage += "<li>"+message+"</li>" ;
                        });
                    });
                    $messageErrList.html(displayMessage);
                }else{
                    $showInfo.append('<tr><td>'+name+'</td><td>'+user+'</td></tr>');
                    $messageErrList.html("");
                }     
            });
        }

        function resetDataBase(){
            $showInfo.load('video/delete');
        }
    }
})(window.jQuery)