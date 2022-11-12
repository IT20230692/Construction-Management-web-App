var prevVal="";
class Validation {

  generate_password(){
    let length = 8;
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";

    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  decimalFormat(input){
    for (let i=0; i<input.length; i++) {
      prevVal = $(input[i]).val();

      $(input[i]).on('input', function(e) {

        var val = $(this).val();

        var userVal =  val.replace(/,/g, ""); // remove commas

        var validValue = userVal.search(/^[0-9]{0,13}\.?[0-9]{0,4}$/) == 0 ? true : false;

        $("#userVal").text(userVal);
        $("#validValue").text(validValue);

        if (userVal !== "" && !validValue && e.keyCode !== 46 && e.keyCode !== 8) {
          $(this).val(prevVal);
        } else {
          prevVal = val;
        }
      });
    }
  }

  validateTp(input,value,err) {
    if(!validateRequired(input)){
      validateRequired(input);
      err++;
    }

    else{
      if (value.length != 10 || !$.isNumeric(value)) {
        err++;
      }

      return err;
    }
  }

  isInRange(input,value,err) {
    if(!validateRequired(input)){
      validateRequired(input);
      err++;
    }

    else{
      if (value > 30 || value < 1) {
        err++;
      }

      return err;
    }
  }

  check_validate(arr,err){
    arr.forEach(check);
    function check(item) {
      if(!validateRequired(item)){
        validateRequired(item);
        err++;
      }
    }
    return err;
  }

  IsNumeric(e) {
    let keyCode = e.which ? e.which : e.keyCode
    let ret = ((keyCode >= 48 && keyCode <= 57));
    return ret;
  }

}

const now = new Date();

class Set_Date{

  Today() {
    return now;
  }
  Today_Format() {
    return now.toISOString().slice(0,10);
  }
  set_Year(date,setYear){
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = date.getDate();
    return formatDate(new Date(year + setYear, month, day));

  }
  set_Month(date,setMonth){
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return formatDate(new Date(year, month+setMonth, day));

  }
  set_Day(date,setDay){
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return formatDate(new Date(year, month, day+setDay));

  }


}


function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

function validateRequired(x) {
  if (document.getElementById(x).value === "") {
    document.getElementById(x).style.background = '#ffcccc';
    return false;
  } else {
    document.getElementById(x).style.background = '#ffffff';
    return true;
  }
}
