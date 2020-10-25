$(function(){
    var url = base_url + 'backoffice/reports/timeclock_details_employee';

    var navbar = $(".navbar").height();
    var functionHeader = $(".second-top-header").height();
    var rangeHeader = $(".form-inline").height();
    var fakeheight = $("#fakeheight").height();
    var GridHeight = (fakeheight - navbar - rangeHeader);
    var NewGridHeight = (GridHeight - 70);

    var source = {
        datatype: "json",
        datafields: [
            { name: 'Login', type: 'string' },
            { name: 'Logout', type: 'string' },
            { name: 'EmployeeName', type: 'string' },
            { name: 'Department', type: 'string' },
            { name: 'Flag', type : 'string'},
        ],
        root: 'list',
        url: url
    };

    var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
        var theFlag = $("#timeclock_employee_list").jqxGrid('getrowdata', row).Flag;
        var EmployeeLoggedIn = $("#timeclock_employee_list").jqxGrid('getrowdata', row).EmployeeLoggedIn;
        if (theFlag == 'Red') {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: red;">' + value + '</span>';
        }
    }

    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#timeclock_employee_list").jqxGrid({
        width: '50%',
        height: NewGridHeight,
        source: dataAdapter,
        columnsresize: true,
        theme: 'darkblue',
        pageable: false,
        pagermode: 'advanced',
        pagesize: 100,
        showfilterrow: true,
        filterable: true,
        filterMode: 'advance',
        showaggregates: true,
        showstatusbar: true,
        statusbarheight: 45,
        columns: [
            { text: 'Login', datafield: 'Login', width: '15%'},
            { text: 'Logout', datafield: 'Logout', width: '15%' },
            { text: 'Employee Name', datafield: 'EmployeeName', width: '40%', cellsrenderer: cellsrenderer,
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = 
                        "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:left;'>Employees Logged in</div>"+
                            "<div style='margin: 4px; float: center; font-weight: bold; text-align:left; color: red;'>Employees Not Logged in</div>"+
                        "</div>";
                    return renderString;
                } 
            },
            { text: 'Department', datafield: 'Department', width: '30%', 
                aggregatesRenderer: function (aggregates, column, element) {
                    var renderString = "<div style='margin: 4px; float: center;  height: 100%; font-weight: bold; background-color: #fff;'>"+
                        "<div id='EmployeeLoggedIn' style='margin: 4px; float: center; font-weight: bold; text-align:right;'>"+dataAdapter.loadedData.EmployeeLoggedIn+"</div>"+
                        "<div id='EmployeeNotLoggedIn' style='margin: 4px; float: center; font-weight: bold; text-align:right; color:red;'>"+dataAdapter.loadedData.EmployeeNotLoggedIn+"</div>"+
                    "</div>";
        
                    return renderString;
                }
            },
            { text: 'Flag', datafield: 'Flag', hidden: true, cellsrenderer: cellsrenderer, width: '10%' }
        ]
    });


    $("#PrintIcon").on('click', function(e){
        e.preventDefault();
        CallDownloadForm();
    })


    var populateDownloadForm = () => {
        var def = $.Deferred();
        setTimeout(function(){
            $("body").append(
                '<div id="download_window" style="display:none; background: #144766; color:#EEE;">'+
                    '<div id="download_window_container" style="background: #144766; color:#EEE; align-items: center; justity-content: left; display:flex; padding-left: 20px;">'+
                        '<button class="btn btn-primary btn-lg" id="download_excel">Excel</button>'+
                    '</div>'+
                '</div>'
            );
            def.resolve();
        },100)
        return def.promise();
    }

    var WindowDownloadForm = () => {
        var def = $.Deferred();
        $("#download_window").jqxWindow({
            height: 150,
            minWidth: 300,
            title: "Download",
            isModal: true,
            theme: 'darkblue',
            showCloseButton: true,
            resizable: false,
            showAnimationDuration: 0,
            closeAnimationDuration: 0
        })
        setTimeout(function(){
            $("#download_window").jqxWindow('open');
            def.resolve();
        },100)
        return def.promise();
    }

    var CallDownloadForm = () => {
        populateDownloadForm()
        .then(function(){
            WindowDownloadForm();
        })
    }

    var download_function = (req) => {
        var postdata ="download="+req;
        $.ajax({
            url: base_url + 'backoffice/reports/timeclock_details_employee/download',
            type: 'post',
            dataType: 'json',
            data: postdata,
            success: function(data){
                window.location = base_url + 'backoffice/reports/timeclock_details_employee/download-file';
                $("#download_window").jqxWindow('close');
            },
            complete: function(){

            }
        })
    }

    $(document).on('click', '#download_excel', function(e){
        e.preventDefault();
        download_function('excel');
    })

})