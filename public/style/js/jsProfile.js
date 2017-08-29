(function($){
    $(processProfile);
    function processProfile(){
        var $name = $('#name');
        var $age = $('#age');
        var $idUser = $('#idUser');
        var $btnShow = $('#Show');
        var $btnAdd = $('#Add');
        var $btnUpdate = $('#Update');
        var $profileInfo = $('#lineInfo');
        var $classRowUserInfo = $('#lineInfo .rowUserInfo');
        var $nameErr = $('#nameErr');
        var $ageErr = $('#ageErr');
      
        $btnAdd.click(addProfileUser);
        $classRowUserInfo.click(displayForEdit);
        $btnUpdate.click(saveEditProfile);
        // $('body').on('dblclick', '#lineInfo .rowUserInfo',displayForEdit);
        
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
            sendInfo.then(reupDataFormUser);

        }

        function displayForEdit(){
            $id = $(this).attr('id');

            $setId = "#"+$id;
            name = $($setId+" .name").text();
            age = $($setId+" .age").text();

            $name.val(name);
            $age.val(age);
            $idUser.val($id);
        }

        function saveEditProfile(e){
            e.preventDefault(e);

            var name = $name.val();
            var age = $age.val();
            var loadActUpdate = $.ajax({
                url: "user/update",
                type: "post",
                dataType: "json",
                data: {name: name , age: age , id: $id}
            });
            
            loadActUpdate.then(addItemUser);

        }

        // display Errors if invalid or add item profile if valid then Add profile 
        function reupDataFormUser(profileErrors){
            var name = $name.val();
            var age = $age.val();
            /* get message error by jquery*/
            console.log(profileErrors);
            if (!profileErrors.success) {
                $.each(profileErrors.err,getErrMessages);
            }else{
                $.each(profileErrors.err,getErrMessages);
                var itemUser = '<tr id="'+profileErrors.lastInsertId+'" class="rowUserInfo"><td>'+name+'</td><td>'+age+'</td></tr>';
                $profileInfo.append(itemUser);
            }
        }
        // display Errors if invalid or add item profile if valid then update profile 
        function addItemUser(dataFormSended){
            var $id = $("#idUser").val();
            var name = $name.val();
            var age = $age.val();
            if(!dataFormSended.success){
                $.each(dataFormSended.err,getErrMessages);
            }else{
                $.each(dataFormSended.err,getErrMessages);
                
                $setId = "#"+$id;
                var tdname = $($setId+" .name").text(name);
                var tdname = $($setId+" .age").text(age);
            }
                
        }
        // get list messageErrors 
        function getErrMessages(errFeildId,errMessages){
            var feildIdName = "#"+ errFeildId;
            var tdError = $(feildIdName);
            var errorHtml ='';

            $.each(errMessages,function setItemErrMessage(messageIndex,message){
                errorHtml+= '<p>'+message+'</p>';
            })
            tdError.html(errorHtml);
        }
    }
})(window.jQuery);
