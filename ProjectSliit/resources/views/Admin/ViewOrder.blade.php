<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Product</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Tempusdominus Bootstrap 4 -->
    <link rel="stylesheet" href="../../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <!-- JQVMap -->
    <link rel="stylesheet" href="../../plugins/jqvmap/jqvmap.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../../dist/css/adminlte.min.css">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="../../plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="../../plugins/daterangepicker/daterangepicker.css">
    <!-- summernote -->
    <link rel="stylesheet" href="../../plugins/summernote/summernote-bs4.min.css">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

    <!-- Preloader -->
    <div class="preloader flex-column justify-content-center align-items-center">
        <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
    </div>

    <!-- Navbar -->
@include('Admin.admin_include.nav')
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
@include('Admin.admin_include.header')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">View Product</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Product</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">View All</h3>
                            </div>
                            <div class="card">

                                <div class="card-body">
                                    <table class="table table-bordered" >
                                        <thead>
                                        <tr>

                                            <th style="width: 150px">Item_1</th>
                                            <th style="width: 150px">Item_2</th>
                                            <th style="width: 150px">Item_3</th>
                                            <th style="width: 40px">site Name</th>
                                            <th style="width: 40px">site Address</th>
                                            <th style="width: 40px">Supplier</th>
                                            <th style="width: 40px">Delivery Date</th>
                                            <th style="width: 40px">Total</th>
                                            <th style="width: 40px">Notes</th>
                                            <th style="width: 40px">Delivery status</th>
                                            <th style="width: 40px">Approval status</th>
                                            <th style="width: 40px">Option</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($orders as $route)
                                            <tr>
                                              <th>{{ $route->Item_1 }}</th>
                                              <td>{{ $route->Item_2 }}</td>
                                              <td>{{ $route->Item_3 }}</td>
                                              <td>{{ $route->site_Name }}</td>
                                              <td>{{ $route->site_Address }}</td>
                                              <td>{{ $route->Supplier }}</td>
                                              <td>  {{date('Y-m-d',strtotime( $route->Delivery_Date ))}}</td>
                                              <td>{{ $route->Total }}</td>
                                              <td>{{ $route->Notes }}</td>
                                              <td>{{ $route->Delivery_status }}</td>
                                              <td>{{ $route->Delivery_status }}</td>
                                              <td>Update</td>
                                            
                                            </tr>
                                            @endforeach
                                            
                                          </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>

        <div class="modal fade" id="ModalAdd">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Update Details</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color: white">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="update_sup_form">
                            {{ csrf_field() }}
                            <input type="text" id="b_id" name="b_id" hidden>

                            <div class="card-body">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Full Name</label>
                                        <input type="text" class="form-control" id="f_name" name="f_name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Address</label>
                                        <input type="text" class="form-control" id="address" name="address"  required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Contact Number</label>
                                        <input type="text" class="form-control" id="con" name="con"  required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Contact Person</label>
                                        <input type="text" class="form-control" id="con_person" name="con_person"  required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Mobile Number</label>
                                        <input type="text" class="form-control" id="mobile" name="mobile" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Email Address</label>
                                        <input type="email" class="form-control" id="email" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Fax</label>
                                        <input type="text" class="form-control" id="fax" name="fax"  required>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer">
                                <button type="submit" id="update_brand" class="btn btn-primary">Update
                                </button>
                            </div>
                        </form>


                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>



        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@include('Admin.admin_include.footer')

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="../../plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../../plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- ChartJS -->
<script src="../../plugins/chart.js/Chart.min.js"></script>
<!-- Sparkline -->
<script src="../../plugins/sparklines/sparkline.js"></script>
<!-- JQVMap -->
<script src="../../plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="../../plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
<!-- jQuery Knob Chart -->
<script src="../../plugins/jquery-knob/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../../plugins/moment/moment.min.js"></script>
<script src="../../plugins/daterangepicker/daterangepicker.js"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="../../plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<!-- Summernote -->
<script src="../../plugins/summernote/summernote-bs4.min.js"></script>
<!-- overlayScrollbars -->
<script src="../../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- AdminLTE App -->
<script src="../../dist/js/adminlte.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="../../dist/js/pages/dashboard.js"></script>
{{--<script src="../../JS/Admin/category.js"></script>--}}
<script src="../../JS/Validate.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    $(document).ready(function () {
        // load_home_01();
    });
</script>
</body>
</html>
