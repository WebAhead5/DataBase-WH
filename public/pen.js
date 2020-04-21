window.onload = function() {
    // Element definitions
    let info = document.getElementById("info"),
        itemCount = document.getElementById("itemCount"),
        dataField = document.getElementById("dataField"),
        submitItem = document.getElementById("submit"),
        download = document.getElementById("download"),
        clear = document.getElementById("clear"),
        deleteLast = document.getElementById("deleteLast"),
        dataTable = document.getElementById("dataTable");

    let counter = 0;

    // Focus
    function focusField() {
        dataField.focus();
    }

    // Modal elements
    let modal = document.getElementById("modal"),
        modalHead = document.getElementById("modalHead"),
        modalMessage = document.getElementById("modalMessage"),
        modalConfirm = document.getElementById("modalConfirm"),
        modalDeny = document.getElementById("modalDeny"),
        modalClose = document.getElementById("modalClose");

    function setModalMessage(title, message, confirmMessage, denyMessage) {
        modalHead.innerHTML = title;
        modalMessage.innerHTML = message;
        modalConfirm.innerHTML = confirmMessage;
        modalDeny.innerHTML = denyMessage;
    }

    function modalHide() {
        modal.style.display = "none";
        focusField();
    }

    function modalShow() {
        modal.style.display = "block";
    }

    modalClose.addEventListener("click", function() {
        modalConfirm.style.display = "inline-block";
        modalDeny.style.display = "inline-block";
        modalHide();
        modalConfirm.removeEventListener("click", truncateTable);
    });

    // Download the table as CSV
    function downloadTable(filename) {
        // Check if the table is empty
        if (dataTable.rows.length > 1) {
            let numOfRows = dataTable.rows.length;
            let numOfColumns = dataTable.rows[0].cells.length;
            numOfColumns = numOfColumns - 1;

            let rows = dataTable.rows;

            let i = 0,
                j = 0;
            let rowString = "";
            while (i < numOfRows) {
                while (j < numOfColumns) {
                    let tempString = rows[i].cells[j].innerHTML;
                    if (j === numOfColumns - 1) {
                        rowString = rowString + tempString;
                    } else {
                        rowString = rowString + tempString + ",";
                    }
                    j++;
                }
                rowString = rowString + "\r\n";
                j = 0;
                i++;
            }

            function download(filename) {
                let link = document.createElement("a");
                link.setAttribute(
                    "href",
                    "data:text/plain;charset=utf-8," + encodeURIComponent(rowString)
                );
                link.setAttribute("download", filename);

                if (document.createEvent) {
                    let event = document.createEvent("MouseEvents");
                    event.initEvent("click", true, true);
                    link.dispatchEvent(event);
                } else {
                    link.click();
                }
            }
            download(filename);
        }
    }

    // Timestamp when a new value is entered
    function timestamp() {
        let d = new Date();
        let year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes(),
            sec = d.getSeconds(),
            meridiem = "AM";

        if (sec < 10) {
            sec = "0" + sec;
        }

        if (min < 10) {
            min = "0" + min;
        }

        if (hour > 11) {
            hour -= 12;
            meridiem = "PM";
        }

        if (hour === 0) {
            hour = 12;
        }

        year = year.toString();
        year = year.slice(2, 4);

        let dateString =
            month +
            "/" +
            day +
            "/" +
            year +
            " " +
            hour +
            ":" +
            min +
            ":" +
            sec +
            " " +
            meridiem;

        return dateString;
    }

    // Create new tr using user input
    function updateTable(data) {
        let row = dataTable.getElementsByTagName("tbody")[0].insertRow(0);
        let rowQuantity = row.insertCell(0),
            rowData = row.insertCell(1),
            rowTimestamp = row.insertCell(2),
            rowOptions = row.insertCell(3);

        rowQuantity.innerHTML = "1";
        rowData.innerHTML = data;
        rowTimestamp.innerHTML = timestamp();
        rowOptions.innerHTML =
            "<a href=#><span class='glyphicon glyphicon-chevron-up'></span></a>" +
            "<a href=#><span class='glyphicon glyphicon-chevron-down'></span></a>" +
            "<a href=#><span class='glyphicon glyphicon-remove-circle'></span></a>";

        // Removes this row from the table
        function removeRow() {
            let index = row.rowIndex;
            let qty = parseInt(dataTable.rows[index].cells[0].innerHTML);
            counter -= qty;
            itemCount.innerHTML = "Number of items: " + counter;
            dataTable.deleteRow(index);
            modalConfirm.removeEventListener("click", removeRow);
            modalHide();
        }

        let increaseQty = document.getElementsByClassName("glyphicon-chevron-up")[0];
        let decreaseQty = document.getElementsByClassName("glyphicon-chevron-down")[0];
        let deleteBtn = document.getElementsByClassName("glyphicon-remove-circle")[0];

        // Increase Qty
        increaseQty.addEventListener("click", function() {
            let qty = parseInt(rowQuantity.innerHTML);
            rowQuantity.innerHTML = qty + 1;
            counter++;
            itemCount.innerHTML = "Number of items: " + counter;
            //focusField();
        });

        // Decrease Qty
        decreaseQty.addEventListener("click", function() {
            let qty = parseInt(rowQuantity.innerHTML);
            if (qty > 0) {
                rowQuantity.innerHTML = qty - 1;
                counter--;
                itemCount.innerHTML = "Number of items: " + counter;
            }
            //focusField();
        });

        // Delete Row
        deleteBtn.addEventListener("click", function() {
            setModalMessage(
                "Confirm Row Deletion",
                "Are you sure you want to delete this row of data?",
                "Yes",
                "No"
            );
            modalShow();
            modalConfirm.addEventListener("click", removeRow);
            modalDeny.addEventListener("click", function() {
                modalConfirm.removeEventListener("click", removeRow);
                modalHide();
            });
        });
    }

    // Clears table data
    function truncateTable() {
        modalConfirm.removeEventListener("click", truncateTable);
        modalHide();
        counter = 0;
        itemCount.innerHTML = "Number of items: " + counter;
        let numOfRows = dataTable.rows.length;
        while (numOfRows > 1) {
            dataTable.deleteRow(1);
            numOfRows = dataTable.rows.length;
        }
    }

    info.addEventListener("click", function() {
        setModalMessage(
            "About - Data Collector v1.0",
            "This application is inteded to be used with any external Bluetooth " +
            "or wired HID scanner.  Connect the scanner to your device and begin " +
            "scanning.  The Data Collector will record a timestamp and quantity " +
            "along with the bar code.  When finished scanning the data can be " +
            "downloaded as a text file in CSV format.",
            "",
            ""
        );
        modalConfirm.style.display = "none";
        modalDeny.style.display = "none";
        modalShow();
    });

    // If enter key is pressed while input field is focused, click submit
    dataField.addEventListener("keypress", function(e) {
        if (this === document.activeElement) {
            let key = e.which || e.keycode;
            if (key === 13) {
                submitItem.click();
            }
        }
    });

    submitItem.addEventListener("click", function() {
        // Get value of input and insert into table
        let data = dataField.value;
        if (dataField.value !== "") {
            counter++;
            itemCount.innerHTML = "Number of items: " + counter;
            updateTable(data);
            dataField.value = "";
        }
        focusField();
    });

    download.addEventListener("click", function() {
        let time = timestamp();
        time = time.replace(/\//g, ".");
        time = time.replace(/ /g, "_");
        time = time.replace(/:/g, ".");
        let filename = "datacollector_" + time + ".txt";
        downloadTable(filename);
        focusField();
    });

    clear.addEventListener("click", function() {
        if (dataTable.rows.length > 1) {
            setModalMessage(
                "Confirm Table Deletion",
                "Are you sure you want to delete all of the data?",
                "Yes",
                "No"
            );
            modalShow();
            modalConfirm.addEventListener("click", truncateTable);
            modalDeny.addEventListener("click", function() {
                modalConfirm.removeEventListener("click", truncateTable);
                modalHide();
            });
        } else {
            focusField();
        }
    });

    deleteLast.addEventListener("click", function() {
        if (dataTable.rows.length > 1) {
            let qty = parseInt(dataTable.rows[1].cells[0].innerHTML);
            counter -= qty;
            itemCount.innerHTML = "Number of items: " + counter;
            dataTable.deleteRow(1);
        }
        focusField();
    });

    focusField();
    //document.addEventListener("click", focusField);
};