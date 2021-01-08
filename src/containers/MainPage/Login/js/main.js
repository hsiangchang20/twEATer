console.log("dao")
var ifforget = document.getElementById("forget")
var forgetThen = document.getElementById("forgetThen")
var poppingImg = document.getElementById("poppingImg")
function forget() {
    ifforget.style.visibility=""
}

function showPassword() {
    forgetThen.style.visibility=""
    forgetThen.innerHTML="Your password is ******"
}

function NoneOfMyBusiness() {
    forgetThen.style.visibility=""
    forgetThen.innerHTML="啊你是在<a style='font-size: 20px' href='#' onclick='popping()'>怕屁</a>喔？"
}

function popping() {
    forgetThen.innerHTML="啊你是在<a style='font-size: 20px' href='#' onclick='poppingImageAppear()'>popping</a>喔？"
}

function poppingImageAppear() {
    poppingImg.style.visibility=""
}


(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }


    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);