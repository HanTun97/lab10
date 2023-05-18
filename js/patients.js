var count = 0;
const now = new Date();

document.getElementById("btnRegisterPatient").addEventListener("click", function(event){
    event.preventDefault();
    var status = true;
    var p_no = document.getElementById("patientIdNumber");
    if (!p_no.value.match(/(P|EP)-\d{3}-\d{6}/)) {
        p_no.focus();
        document.getElementById("notify").className = "form-text text-danger";
    }
    var f_name = document.getElementById("firstName");
    var m_name = document.getElementById("middleInitials");
    var l_name = document.getElementById("lastName");
    var dob = document.getElementById("dateOfBirth");
    var ddl = document.getElementById("ddlDepartment");
    var is_p = document.querySelector('input[name="radioIsOutPatient"]:checked');

    if( p_no.value == "" || f_name.value == "" || l_name.value == "" || 
        dob.value == "" || ddl.value == "" || is_p == null){
        status = false;
        alert("Fields Require!");
    }
    if(status){
        var registered = [p_no, f_name, m_name, l_name, dob, ddl, is_p];
        // registered_list[count] = registered;
        var tblBody = document.getElementById("tbodyPatientsList");
        var row = document.createElement("tr");
        count += 1;
        row.setAttribute('id', 'record'+count);
        for (var j = 0; j < registered.length; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(registered[j] != null ? registered[j].value : "");
            cell.setAttribute('class', 'data'+j);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
        document.getElementById("registerForm").reset();
        document.getElementById("notify").className = "form-text text-muted";
    }
  });

  var chkElderlyPatients = document.querySelector("input[name=chkElderlyPatients]");
  chkElderlyPatients.addEventListener('change', function() {
    if (this.checked) {
      chkElderlyPatientsChecked();
    } else {
        unchecked();
    }
  });

var chkShowOutPatients = document.querySelector("input[name=chkShowOutPatients]");
chkShowOutPatients.addEventListener('change', function() {
  if (this.checked) {
    chkShowOutPatientsChecked();
  } else {
    unchecked();
  }
});

function chkElderlyPatientsChecked(){
    for (var j = 1; j <= count; j++) {
        const recorded_date = document.getElementById("registeredList").rows[j].cells[4].innerHTML; 
        const diff = Math.abs(now - Date.parse(recorded_date));
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
        if( age < 65){
            document.getElementById('record'+j).style.display = 'none';
        }
      }
}

function chkShowOutPatientsChecked(){
    for (var j = 1; j <= count; j++) {
        if(document.getElementById("registeredList").rows[j].cells[6].innerHTML == 'No'){
            document.getElementById('record'+j).style.display = 'none';
        }
    }
}

function unchecked(){
    for (var j = 1; j <= count; j++) {
        document.getElementById('record'+j).style.display = '';
    }
    if(chkShowOutPatients.checked){
        chkShowOutPatientsChecked();
    }
    if(chkElderlyPatients.checked){
        chkElderlyPatientsChecked();
    }
}