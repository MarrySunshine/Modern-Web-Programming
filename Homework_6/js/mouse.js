window.onload = function() {

    var form = document.getElementsByTagName("form")[0];
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 10; ++j) {
            var newInput = document.createElement("input");
            newInput.type = "radio";
            newInput.className = "mole-style";
            newInput.tag = 0;
            form.appendChild(newInput)
        }
    }
    var aForm = form.getElementsByTagName("input");

    var	message = $("#message");
    var control = $("#control");
    var time_input = $("#time");
    var score_input = $("#score");
    var score = 0;
    var time = 30;
    var state = -1;
    var timer;

    message.value = "Game Over";
    time_input.value = time;
    score_input.value = score;

    control.addEventListener("click", function() {
        if (state == -1) {
            state = 0;
            var ran = Math.floor(Math.random()*60);
            aForm[ran].checked = true;
            aForm[ran].tag = 1;
        }
        if (state == 0) {
            state = 1;
            message.value = "Playing";
            timer = window.setInterval(function() {
                if (time == 0) {
                    window.clearInterval(timer);
                    alert("Game Over.\nYour score is: "+score);
                    return;
                }

                --time;
                time_input.value = time;
            }, 1000);
        } else {
            message.value = "Game Stop";
            state = 0;
            window.clearInterval(timer);
        }
    });

    for (var i = 0; i < aForm.length; ++i) {
        aForm[i].addEventListener("click", function() {
            this.checked = false;
            if (state == 1) {
                if (this.tag == 1) {
                    this.checked = false;
                    this.tag = 0;

                    var ran = Math.floor(Math.random()*60);
                    aForm[ran].checked = true;
                    aForm[ran].tag = 1;

                    ++score;
                } else {
                    --score;
                }
                score_input.value = score;
            } else {
                // do nothing...
            }
        });
    }
}