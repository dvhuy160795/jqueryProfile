(function($){
    $(processProfile);
    function processProfile(){
        var $name = $('#name');
        var $age = $('#age');
        var $btnShow = $('#Show');
        var $btnAdd = $('#Add');
        var $btnUpdate = $('#Update');
        var $profileInfo = $('#lineInfo');

        $btnShow.click(displayProfileUser);
        $btnAdd.click(addProfileUser);

        function displayProfileUser(){
            var getDataProfile = $.ajax({
                type: "get",
                url: "user/show",          
            });

            getDataProfile.then(representProfile);
            
            function representProfile(datas){
                console.log(datas);
                $profileInfo.html(datas);
            }
        }

        function addProfileUser(){
            var name = $name.val();
            var age = $age.val();
            //alert(name+age);
            var sendInfo = $.ajax({
                type: "Post",
                url: "user/add",
                data: {name: name, age: age}
            });
            sendInfo.then(function reupInfo(data){
                displayProfileUser();
            });
        }
    }
})(window.jQuery);
