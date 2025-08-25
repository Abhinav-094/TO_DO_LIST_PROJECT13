let check_edit = null;
let count = 0;

function uname(event) {
  var key = event.which || event.keyCode;
  if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key === 32) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

function check_validation() {
  var name = document.getElementById("user_name").value.trim();
  var email = document.getElementById("user_mail").value.trim();
  var pass = document.getElementById("user_pass").value.trim();

  if (name == "") {
    document.getElementById("name_msg").innerText = "PLS_FILL_NAME";
  } else {
    document.getElementById("name_msg").innerText = "";
  }

  if (email == "") {
    document.getElementById("mail_msg").innerText = "PLS_FILL_MAIL";
  } else {
    document.getElementById("mail_msg").innerText = "";
  }

  if (pass == "") {
    document.getElementById("pass_msg").innerText = "PLS_FILL_PASS";
  } else {
    document.getElementById("pass_msg").innerText = "";
  }

  if (name != "" && email != "" && pass != "") {
    document.getElementById("submit_button").disabled = false;
  } else {
    document.getElementById("submit_button").disabled = true;
  }
}

function msg_print() {
  document.getElementById("name_msg").innerText = "PLS_FILL_NAME";
  document.getElementById("mail_msg").innerText = "PLS_FILL_MAIL";
  document.getElementById("pass_msg").innerText = "PLS_FILL_PASS";
  document.getElementById("submit_button").disabled = true;
}

function submit_btn(e) {
  e.preventDefault();

  var uname = document.getElementById("user_name").value.trim();
  var uemail = document.getElementById("user_mail").value.trim();
  var upass = document.getElementById("user_pass").value.trim();

  if (uname == "" || uemail == "" || upass == "") {
    check_validation();
    return;
  }

  Swal.fire({
    title: "DATA SUBMITTED",

    icon: "success",
  });

  var table = document.getElementById("main_table");

  if (check_edit !== null) {
    document.getElementById("name" + check_edit).innerText = uname;
    document.getElementById("email" + check_edit).innerText = uemail;
    document.getElementById("pass" + check_edit).innerText = upass;
    check_edit = null;
  } 
  else 
    {
    count++;
    var row =  document.createElement("tr");
    row.id = count;

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td1.id = "name" + count;
    td2.id = "email" + count;
    td3.id = "pass" + count;

    td1.innerText = uname;
    td2.innerText = uemail;
    td3.innerText = upass;

    td4.innerHTML = `<button onclick="edit_row(${count})"><i class="ri-edit-box-fill"></i></button>`;
    td5.innerHTML = `<button onclick="del(${count})"><i class="ri-delete-bin-line"></i></button>`;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);

    table.appendChild(row); 
  }

  // Reset fields
  document.getElementById("user_name").value = "";
  document.getElementById("user_mail").value = "";
  document.getElementById("user_pass").value = "";
  check_validation();
}

function edit_row(i) {
  check_edit = i;
  var name = document.getElementById("name" + i).innerText;
  var email = document.getElementById("email" + i).innerText;
  var pass = document.getElementById("pass" + i).innerText;

  document.getElementById("user_name").value = name;
  document.getElementById("user_mail").value = email;
  document.getElementById("user_pass").value = pass;

  check_validation();

  Swal.fire({
    title: "Do you want to edit the data?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "YES",
    denyButtonText: "NO",
  }).then((result) => {
    if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      check_edit = null;
    }
  });
}

function del(i) {
  var row = document.getElementById(i);
  if (row) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        row.remove();
        Swal.fire("Deleted!", "Your row has been deleted.", "success");
      }
    });
  }
  document.getElementById("user_name").value = "";
  document.getElementById("user_mail").value = "";
  document.getElementById("user_pass").value = "";
}