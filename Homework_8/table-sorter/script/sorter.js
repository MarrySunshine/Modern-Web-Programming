$(function () {
    $("th")
        .each(function () {
            this.tag = 0;
        })
        .on("click", function () {
            var oTbable = $(this).parent().parent().parent();
            var index = $(this).index();
            var temp = this.tag;
            $("th").each(function () {
                this.tag = 0;
            });
            if (temp == 0 || temp == -1) {
                this.tag = 1;
            } else if (temp == 1) {
                this.tag = -1;
            }
            tableSort(oTbable[0], index, this.tag);
        })
        .on("click", function () {
            var class_name = this.className;
            //head.removeClass("ascend-sort");
            //head.removeClass("descend-sort");
            $("th")
                .removeClass("ascend-sort")
                .removeClass("descend-sort");
            if (class_name == "") {
                $(this).addClass("ascend-sort");
            } else if (class_name == "ascend-sort") {
                this.className = "descend-sort";
            } else if (class_name == "descend-sort") {
                this.className = "ascend-sort";
            }
        });
});

function tableSort (table, index, tag) {
    var array = [];
    var oTbody = $(table).children("tbody");

    var aTr = oTbody.children("tr");

    for (var i = 0; i < aTr.length; ++i) {
        array[i] = [];
        var aTd = $(aTr[i]).children("td");
        for (var j = 0; j < aTd.length; ++j) {
            array[i].push($(aTd[j]).text());
        }
    }

    array.sort(function (a, b) {
        if (tag == 1) {
            return a[index] > b[index] ? 1 : -1;
        } else if (tag == -1) {
            return a[index] < b[index] ? 1 : -1;
        }
    });

    oTbody.html("");

    for (var i = 0; i < array.length; ++i) {
        var newTr = document.createElement("tr");
        for (var j = 0; j < array[i].length; ++j) {
            var newTd = document.createElement("td");
            $(newTd).html(array[i][j]);
            $(newTr).append(newTd);
        }
        oTbody.append(newTr);
    }
}