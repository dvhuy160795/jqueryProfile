(function($) {
		$(profilePage);
		function profilePage() {
			
			var $name = $('#txtName');
			var $age = $('#txtAge');
			var $add = $('#btn');
			var $displayName = $('#displayName');
			var $displayBirthYear = $('#displayBirthYear');
			var $profileInfo = $('#profileInfo');

			$name.keyup(displayName);
			$age.keyup(displayBirthYear);
			$add.click(displayProfile);

			function displayName() {
				var name = $name.val();
				var gettingDataName = $.get("processGetName.php",{name:name});
				

				gettingDataName.then(representProfile);

				function representProfile(userProfile){
					$displayName.html(userProfile);
				}
			}

			function displayBirthYear() {
				var age = $age.val();
				var gettingDataAge = $.post("processGetAge.php",{age:age});

				gettingDataAge.then(representAge);

				function representAge(userProfile){
					$displayBirthYear.html(userProfile);
				}
			}

			function displayProfile() {
				var name = $name.val();
				var age = $age.val();
				var gettingProfile = $.ajax({
					url:"processHome.php",
					type: "post",
					//dataType: "json",
					data:{name:name , age:age}
				});

				gettingProfile.then(representProfile);

				function representProfile(profiles) {
					//var displayHtmlProfile;

					//$.each(profiles,displayHtml)

					//function displayHtml(index,profile){
					//	displayHtmlProfile+="<tr><td>"+profile.name+"</td>"+"<td>"+profile.age+"</td></tr>";
					//}

					//$profileInfo.html(displayHtmlProfile);
					var displayHtmlProfile = "<tr><td>"+name+"</td>"+"<td>"+age+"</td></tr>";
					var profileT = $('#profileT');
					profileT.append(displayHtmlProfile);
				}
			}
		} //profilePage
	})(window.jQuery);


	// (function abc(a,b){
	// 	alert(a+b);
	// })(4,5);

	// //Callback
	// (function(fnCallback){
	// 	fnCallback(window.$, window, document);
	// })(function($, w, d){

	// });