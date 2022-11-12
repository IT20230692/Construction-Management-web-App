$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('#save_home_01').submit(function(e) {

    let save_form = document.getElementById('save_home_01');
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure to save?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let formData = new FormData(save_form);

        $.ajax({
           type:'POST',
           url: "/supplier_save",
            data: formData,
            contentType: false,
            processData: false,
            success: (response) => {
               console.log(response);
              if (response) {
                this.reset();
                Swal.fire(
                  'success!',
                  'Your work has been saved',
                  'success'
                )
                  // load_home_01();
              }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error Please contact admin !'
                })
              }
            },

        });
      }
    })


});





function load_home_01(){
  $('#home01_load tbody').html("");
  $.ajax({
    type:'GET',
    url: "/load_supplier",
     success: (response) => {
       if (response) {
          $.each(response, function(key,value) {
              // idSupplier, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax, Active_Status
              let status="<span style='color: green'>Active</span>";
              if (value.Active_Status=="0"){
                  status="<span  style='color: red'>Inactive</span>";
              }
            $('#home01_load tbody').append('<tr>'
                + '<td class="td-input">' + value.Name + '</td>'
                + '<td class="td-input">' + value.Address + '</td>'
                + '<td class="td-input">' + value.Contact_no + '</td>'
                + '<td class="td-input">' + value.Contact_person + '</td>'
                + '<td class="td-input">' + value.Mobile_No + '</td>'
                + '<td class="td-input">' + value.Email + '</td>'
                + '<td class="td-input">' + value.Fax + '</td>'
                + '<td class="td-input">'+status+'</td>'

                + '<td class="td-input" >'

                + "<input type='submit' class='btn btn-info' id=" + value.idSupplier + " onclick='update_category(this.id,\""+value.Name+"\",\""+value.Address+"\",\""+value.Contact_no+"\",\""+value.Contact_person+"\",\""+value.Mobile_No+"\",\""+value.Email+"\",\""+value.Fax+"\");'  value='Update' data-toggle='modal' data-target='#ModalAdd'>"
                + '</td>'
            + '<td class="td-input" >'
            + '<input type="submit" class="btn btn-danger" id=' + value.idSupplier + ' onclick="delete_supplier(this.id);" value="Delete">'
            + '</td>'
            + '</tr>');
          });
       }
     },

 });
}

function delete_supplier(id){

  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to delete this ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({
        type:'GET',
        url: '/supplier_delete/'+id,
         success: (response) => {
           if (response) {
             Swal.fire(
               'success!',
                 'Successfully Deleted !',
               'success'
             )
               load_home_01();
           }else{
               Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                   text: 'Error Please contact admin !'
               })
           }
         },

     });

    }
  })

}

// idSupplier, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax, Active_Status
function update_category(idSupplier, Name, Address, Contact_no, Contact_person, Mobile_No, Email, Fax){

  $("#b_id").val(idSupplier);
    $("#f_name").val(Name);
  $("#address").val(Address);
    $("#con").val(Contact_no);
    $("#con_person").val(Contact_person);
    $("#mobile").val(Mobile_No);
    $("#email").val(Email);
    $("#fax").val(Fax);

}

$('#update_sup_form').submit(function(e) {
  e.preventDefault();

  Swal.fire({
    title: 'Are you sure to update?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Update it!'
  }).then((result) => {
    if (result.isConfirmed) {
      let formData = new FormData(this);
      $.ajax({
         type:'POST',
         url: "/sup_update",
          data: formData,
          contentType: false,
          processData: false,
          success: (response) => {
             console.log(response);
            if (response) {
              window.location.reload();
            }else{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Not updated !'
              })
            }
          },

      });
    }
  })


});
