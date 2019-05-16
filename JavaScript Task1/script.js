/**Script file for PAEVAPLAAN*/

// global variables
var maxCount = 1;


//making the moving part
function moveChoiceTo(elem_choice, direction) {

    var span = elem_choice.parentNode,
        td = span.parentNode;

    if (direction === -1 && span.previousElementSibling) {
        td.insertBefore(span, span.previousElementSibling);
    } else if (direction === 1 && span.nextElementSibling) {
        td.insertBefore(span, span.nextElementSibling.nextElementSibling)
    }
}

//adding rows to a table
function addRow() {

    var n = new Date();
    var m = n.getMinutes() + 1;
    var d = n.getHours();
    var cb = document.getElementById('CBox');
    var table = document.getElementById('tableCell');
    var text1 = document.getElementById("item").value;
    var text2 = document.getElementById("timeItem").value;

    if (text1 === '') {
        alert('Your input is Empty');
    } else {

        var text = text1 + " | " + text2;
        var textWithTime = text1 + " | " + d + ":" + m;

        //if current time is selecte
        if (cb.checked === true) {
            table.innerHTML +=
                "<td style='display: block;'  >" +
                "<a href='#' onclick='moveChoiceTo(this, -1)'>" + " &uarr; </a>" +
                "<a id='down' href='#' onclick='moveChoiceTo(this, 1);'>" + " &darr; </a>" +
                "<span id='editable' onclick='edit();'>" + textWithTime + "</span>" +
                "</td>";

            //else add without a current time
        } else {
            table.innerHTML +=
                "<td style='display: block;'>" +
                "<a href='#' onclick='moveChoiceTo(this, -1)'>" + " &uarr; </a" +
                "><a id='down' href='#' onclick='moveChoiceTo(this, 1);'>" + " &darr; </a>" +
                "<ss id='editable' onclick='edit()'>" + text + "</ss>" +
                "</td>";
        }
    }
}

//deleting rows
function deleteRow() {
    document.getElementById("tableCell").deleteCell(0);
    maxCount -= 1;
}

// when clicked on DeleteAllElements, change the td count to ZERO.
document.getElementById('deleteAllItems').onclick = function () {
    maxCount = 0;
};

//delete all
function deleteAll() {

    for (var i = maxCount - 1; i > 0; i--) {
        document.getElementById('tableCell').deleteCell(i - 1);
    }
    maxCount = 1;
}

function edit() {
    document.getElementById("editable").contentEditable = true;
}

