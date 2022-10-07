/**
 *  Registration,Login,Team validation
 */

$(document).ready(function() {

	/* Registration & Login RegEx */
	var $fnamereg = /^([A-Za-z]{2,20})$/
	var $lnamereg = /^([A-Za-z]{2,20})$/
	var $mailreg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
	var $passreg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

	/* Team RegEx*/
	var $teamreg = /^([A-Za-z]{2,20})$/

	/* Project RegEx */
	var $pnamereg = /^([A-Za-z+\s]{7,50})$/
	var $ptechreg = /^([A-Za-z+\s]{2,40})$/

	/* Registration & Login Flag */
	var $txtfnameflg = true;
	var $txtlnameflg = true;
	var $txtmailflg = true;
	var $txtpassflg = true;

	/* Team Flag*/
	var $txtteamflg = true;

	/* Project Flag */
	var $pnameflg = true;
	var $ptechflg = true;
	var $pStatus = true;
	var $pDelete = true;

	/*  User Registration And Login validation  */

	$('#InputFirstName').blur(function() {
		$('#firstNameValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#firstNameValidation').html("(*) First Name Should not be blank ");
			$txtfnameflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($fnamereg)) {
				$('#firstNameValidation').html("Invalid First Name ");
				$txtfnameflg = false;
				$("#btnSub").attr("disabled", true);
			} else {
				$txtfnameflg = true;
				console.log($txtfnameflg);
				$("#btnSub").attr("disabled", false);
			}
		}
	})


	$('#InputLastName').blur(function() {
		$('#lastNameValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#lastNameValidation').html("(*) Last Name Should not be blank ");
			$txtlnameflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($lnamereg)) {
				$('#lastNameValidation').html("Invalid Last Name ");
				$txtlnameflg = false;
				$("#btnSub").attr("disabled", true);
			} else {
				$txtlnameflg = true;
				$("#btnSub").attr("disabled", false);
			}
		}
	})


	$('#InputEmail').blur(function() {
		$('#emailValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#emailValidation').html("(*) Email Should not be blank ");
			$txtmailflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($mailreg)) {
				$('#emailValidation').html("Invalid Email Address ");
				$txtmailflg = false;
				$("#btnSub").attr("disabled", true);
			} else {
				$txtmailflg = true;
				$("#btnSub").attr("disabled", false);
			}
		}
	})


	$('#InputPassword').blur(function() {
		$('#passwordValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#passwordValidation').html("(*) Password Should not be blank ");
			$txtpassflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($passreg)) {
				$('#passwordValidation').html("Invalid Password");
				$txtpassflg = false;
				$("#btnSub").attr("disabled", true);
			} else {

				$txtpassflg = true;
				$("#btnSub").attr("disabled", false);
			}
		}
	})




	$('#InputFirstName').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#firstNameValidation').empty();
	})

	$('#InputLastName').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#lastNameValidation').empty();
	})

	$('#InputEmail').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#emailValidation').empty();
		$('#FormValidation').empty();
	})

	$('#InputPassword').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#passwordValidation').empty();
	})



	if ($txtpassflg == false && $txtmailflg == false && $txtlnameflg == false && $txtfnameflg == false) {
		alert('Please fill valid details');
		$("#btnSub").attr("disabled", true);
	}

	/*********************************************************************************************************/


	/* Team Validation */

	$('#InputTeamName').blur(function() {
		$('#teamNameValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#teamNameValidation').html("(*) Team Name Should not be blank ");
			$txtteamflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($teamreg)) {
				$('#teamNameValidation').html("Invalid Team Name ");
				$txtteamflg = false;
				$("#btnSub").attr("disabled", true);
			} else {
				$txtteamflg = true;
				console.log($txtfnameflg);
				$("#btnSub").attr("disabled", false);
			}
		}
	})

	$('#InputTeamName').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#teamNameValidation').empty();
	})

	if ($txtteamflg == false) {
		alert('Please Enter Team Name ');
		$("#btnSub").attr("disabled", true);
	}

	/***************************************************************************************/


	/****************************************************************************************/
	/*					Project validation					 */

	$('#InputProject').blur(function() {
		$('#projectNameValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#projectNameValidation').html("(*) Project Name Should not be blank ");
			$pnameflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($pnamereg)) {
				$('#projectNameValidation').html("Invalid Project Name ");
				$pnameflg = false;
				$("#btnSub").attr("disabled", true);
			} else {
				$pnameflg = true;
				$("#btnSub").attr("disabled", false);
			}
		}
	})

	$('#InputTechnology').blur(function() {
		$('#projectTechValidation').empty();

		if ($(this).val() == "" || $(this).val() == null) {
			$('#projectTechValidation').html("(*) Technology Name Should not be blank ");
			$ptechflg = false;
			$("#btnSub").attr("disabled", true);
		} else {
			if (!$(this).val().match($ptechreg)) {
				$('#projectTechValidation').html("Invalid Technology Name ");
				$ptechflg = false;
				$("#btnSub").attr("disabled", true);
			} else {
				$ptechflg = true;
				$("#btnSub").attr("disabled", false);
			}
		}
	})

	$('#InputProject').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#projectNameValidation').empty();
	})

	$('#InputTechnology').keypress(function() {
		$("#btnSub").attr("disabled", false);
		$('#projectTechValidation').empty();
	})


	if ($pnameflg == false && ptechflg == false) {
		alert("Please Fill All The Fields !");
		$("#btnSub").attr("disabled", true);
	}

	$('#btnSub').click(function() {
		var status = $('#selectStatus');
		if (status.val() == "") {
			$('#statusValidation').html("Please Select Status !");
			alert("Please Select Status Option");
			$("#btnSub").attr("disabled", true);
		}
		else {
			$("#btnSub").attr("disabled", false);
		}
	})



})