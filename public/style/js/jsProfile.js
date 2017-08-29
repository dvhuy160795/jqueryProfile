//best practice
(function(profilePage){
    profilePage(window.jQuery);
}(function($){
    $(processProfile);

    function processProfile(){
        var $name = $('#name');
        var $age = $('#age');
        var $userId = $('#idUser');
        var $buttonAdd = $('#Add');
        var $buttonUpdate = $('#Update');
        var $profileInfo = $('#lineInfo');
        var $classRowUserInfo = $('#lineInfo .rowUserInfo');
        var $nameErr = $('#nameErr');
        var $ageErr = $('#ageErr');
        var $errorArea = $('.error-message');

        $buttonAdd.click(addProfileUser);
        $classRowUserInfo.click(displayForEdit);
        $buttonUpdate.click(saveEditProfile);
        
        function addProfileUser(event) {      
            var name = $name.val();
            var age = $age.val();
            var addingUser = $.ajax({
                type: "post",
                url: "user/add",
                data: {name: name, age: age},
                dataType: "json",
            });

            resetMessageError();
            event.preventDefault();
            addingUser
                .done(appendItemUser)
                .fail(displayInputError);
            
        }

        function displayForEdit(){
            var $id = $(this).attr('id');

            $setId = "#"+$id;
            name = $($setId+" .name").text();
            age = $($setId+" .age").text();

            $name.val(name);
            $age.val(age);
            $userId.val($id);
        }

        function saveEditProfile(event){
            var userId = $userId.val()
            var name = $name.val();
            var age = $age.val();
            var loadingActUpdate = $.ajax({
                url: "user/update",
                type: "post",
                dataType: "json",
                data: {name: name , age: age , id: userId}
            });

            event.preventDefault();
            resetMessageError();
            loadingActUpdate.done(editItemUser);
            loadingActUpdate.fail(displayInputError);
            // loadingActUpdate.fail(function(jqXHR, textStatus, errorThrown ){
            //     console.log(jqXHR, textStatus, errorThrown );
            // });
        }

        // display edit item profile if valid then update profile 
        function editItemUser(dataFormSended){
            userId = dataFormSended.id;
            userName = dataFormSended.name;
            userAge = dataFormSended.age;
            $tdUserName = $("#"+ userId + " .name");
            $tdUserAge = $("#" + userId + " .age");

            $tdUserName.html(userName);
            $tdUserAge.html(userAge);
        }

        function appendItemUser(profile){
            var itemUser = '<tr id="'+profile.id+'" class="rowUserInfo"><td>'+profile.name+'</td><td>'+profile.age+'</td></tr>';
            $profileInfo.append(itemUser);
        }

        // get list messageErrors 
        function displayInputError(resp){
            var error = resp.responseJSON;
            var message = error.message;
            var mapFieldIdToMessagesMap = error.data;
            for(var inputId in mapFieldIdToMessagesMap) {
                var mapErrorCode2Message = mapFieldIdToMessagesMap[inputId];
                var $errorInputArea = $('#'+inputId+'Err');
                var htmlError = '';
                for(var errorCode in mapErrorCode2Message) {
                    var message = mapErrorCode2Message[errorCode];
                    htmlError += '<p>' + message + '</p>';
                }
                $errorInputArea.html(htmlError);
            }
        }

        function resetMessageError(){
            $errorArea.html("");
        }
    }
})
);

