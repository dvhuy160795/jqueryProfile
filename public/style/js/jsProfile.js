(function($){
    $(processProfile);
    function processProfile(){
        var $name = $('#name');
        var $age = $('#age');
        var $btnShow = $('#Show');
        var $btnAdd = $('#Add');
        var $btnUpdate = $('#Update');
        var $profileInfo = $('#lineInfo');
        var $classRowUserInfo = $('#lineInfo .rowUserInfo');
        var $nameErr = $('#nameErr');
        var $ageErr = $('#ageErr');
        $btnAdd.click(addProfileUser);
     //   $classRowUserInfo.click(displayToInput);

        function addProfileUser(e){
            e.preventDefault(e);
            
            var name = $name.val();
            var age = $age.val();
            //alert(name+age);
            var sendInfo = $.ajax({
                type: "post",
                url: "user/add",
                data: {name: name, age: age},
                dataType: "json",
            });
            sendInfo.then(function reupInfo(profileErrors){
                /* get message error by jquery*/
                console.log(profileErrors);
                if(!profileErrors.success){

                $.each(profileErrors.err,function(errFeildId,errMessages){
                    var feildIdName = "#"+ errFeildId;
                    var tdError = $(feildIdName);
                    var errorHtml ='';
                    
                    console.log(errMessages);

                    $.each(errMessages,function(messageIndex,message){
                    errorHtml+= '<p>'+message+'</p>';
                    })
                    tdError.html(errorHtml);
                })
                }else{
                    var name = $name.val();
                    var age = $age.val();
                    $profileInfo.append('<tr><td>'+name+'</td><td>'+age+'</td></tr>');
                }
                
            });
            sendInfo.fail(function failRes(profileErrors){
            //    var profileForm = $('#profileForm');
            //     profileForm.submit();
            });
        }



        function displayForEdit(){
            $id = $(this).attr('id');
            alert($id);
        }
    }
})(window.jQuery);
