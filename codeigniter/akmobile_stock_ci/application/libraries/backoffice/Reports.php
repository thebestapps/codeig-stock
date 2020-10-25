<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reports {

	public function __construct()
    {

       // parent::_construct();
        $CI =& get_instance();
       $CI->load->helper('url');
       $CI->load->library('session');
       $CI->load->database();
    }

    function ranged_date($cc,$t_sel,$Start)
    {	
		$base_url = base_url();

		if($Start != null ){
		$date = json_decode($Start);
		foreach($date as $sdate):
			$sd = $sdate->StartDate;
		endforeach;
		}
    	// dates calculations
    	// today
    	$StartDate 					= date("Y-m-d");
		$EndDate 					= date("Y-m-d");
    	$today 						= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$StartDate?> 00:00:00'));
				  					   $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$EndDate?> 23:59:59'));";
		//Yesterday 					
		$yesterday_start 			= date('Y-m-d',strtotime('-1 day', strtotime($StartDate)));
		$yesterday_end   			= date('Y-m-d',strtotime('-1 day', strtotime($EndDate)));
		$yesterday 					= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$yesterday_start?> 00:00:00'));			
					 				   $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$yesterday_end?> 23:59:59'));";
		// Week to date today
		$Weektodate_start 			=  date('Y-m-d',strtotime('sunday last week', strtotime($StartDate)));
		$Weektodate_end 			=  date('Y-m-d',strtotime($EndDate));
		$Weektodate 				= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$Weektodate_start?> 00:00:00'));			
					 				   $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$Weektodate_end?> 23:59:59'));";
		// Last Week (Sun) to (Sat)
		$lastweek_start 			=  date('Y-m-d',strtotime('-7 day',strtotime('sunday last week', strtotime($StartDate))));
		$lastweek_end 				=  date('Y-m-d',strtotime('saturday last week', strtotime($EndDate)));
		$lastweek 					= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$lastweek_start?> 00:00:00'));			
					  				   $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$lastweek_end?> 23:59:59'));";
        // Week Before Last (Sun) to (Sat)
		$WeekBeforeLast_start 	    =  date('Y-m-d',strtotime('-14 day',strtotime('sunday last week', strtotime($StartDate))));
		$WeekBeforeLast_end 		=  date('Y-m-d',strtotime('-7 day',strtotime('saturday last week', strtotime($EndDate))));
		$WeekBeforeLast 			= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$WeekBeforeLast_start?> 00:00:00'));			
					  	 			   $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$WeekBeforeLast_end?> 23:59:59'));";
        // Month to date (1st date of the month) to today
  		$ThisYearMonthtodate_start 	=  date('Y-m-d',strtotime('first day of this month', strtotime($StartDate)));
		$ThisYearMonthtodate_end	=  date('Y-m-d',strtotime($EndDate));
		$ThisYearMonthtodate		= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$ThisYearMonthtodate_start?> 00:00:00'));				  	 			   $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$ThisYearMonthtodate_end?> 23:59:59'));";
		// Last month 
		$LastMonthStart 			=  date('Y-m-d',strtotime('-1 month', strtotime(date('Y-m',strtotime($StartDate)))));
		$LastMonthEnd 				=  date('Y-m-d',strtotime('last day of this month',strtotime('-1 month', strtotime(date('Y-m',strtotime($StartDate))))));
		$LastMonth					= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$LastMonthStart?> 00:00:00'));				  	 			                $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$LastMonthEnd?> 23:59:59'));";
		// Last 30 day
		$Last30DaysStart 			=  date('Y-m-d',strtotime('-30 day', strtotime($StartDate)));
		$Last30DaysEnd 				=  date('Y-m-d',strtotime($EndDate));
		$Last30Days					= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$Last30DaysStart?> 00:00:00'));				  	 			                $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$Last30DaysEnd?> 23:59:59'));";
        // Last 60 day
  		$Last60DaysStart 			=  date('Y-m-d',strtotime('-59 day ', strtotime($StartDate)));
		$Last60DaysEnd 		        =  date('Y-m-d',strtotime($EndDate));
		$Last60Days					= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$Last60DaysStart?> 00:00:00'));				  	 			                $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$Last60DaysEnd?> 23:59:59'));";
        // Last 90 days
		$Last90DaysStart 			=  date('Y-m-d',strtotime('-89 day', strtotime($StartDate)));
		$Last90DaysEnd 		        =  date('Y-m-d',strtotime($EndDate));
		$Last90Days					= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$Last90DaysStart?> 00:00:00'));				  	 			                $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$Last90DaysEnd?> 23:59:59'));";
		// THis year
		$ThisYearYeartodateStart 	=  date('Y-m-d',strtotime('first day of january this year'));
		$ThisYearYeartodateEnd 		=  date('Y-m-d',strtotime($EndDate));
		$ThisYearYeartodate			= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$ThisYearYeartodateStart?> 00:00:00'));				  	 			       $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$ThisYearYeartodateEnd?> 23:59:59'));";
		// Last year Today
		$LastYearTodayStart 		=  date('Y-m-d',strtotime('-1 year', strtotime($StartDate)));
		$LastYearTodayEnd 			=  date('Y-m-d',strtotime('-1 year', strtotime($EndDate)));
		$LastYearToday				= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$LastYearTodayStart?> 00:00:00'));				  	 			       		 $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$LastYearTodayEnd?> 23:59:59'));";
		// Last Year week to date
		$LastYearWeektodateStart 	= date('Y-m-d',strtotime('sunday last week', strtotime('-1 year ',strtotime($StartDate))));
		$LastYearWeektodateEnd 		= date('Y-m-d',strtotime('-1 year', strtotime($EndDate)));
		$LastYearWeektodate			= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$LastYearWeektodateStart?> 00:00:00'));				  	 			       		$('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$LastYearWeektodateEnd?> 23:59:59'));";
		// Last year month to date
		$LastYearMonthtodateStart 	= date('Y-m-d',strtotime('-1 year first day of this month', strtotime($StartDate)));
		$LastYearMonthtodateEnd 	= date('Y-m-d',strtotime('-1 year', strtotime($EndDate)));
		$LastYearMonthtodate		= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$LastYearMonthtodateStart?> 00:00:00'));				  	 			       		$('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$LastYearMonthtodateEnd?> 23:59:59'));";
        // Last Year to date
		$LastYearYeartodateStart 	= date('Y-m-d',strtotime('-1 year', strtotime('first day of january this year')));
		$LastYearYeartodateEnd 		= date('Y-m-d',strtotime('-1 year', strtotime($EndDate)));
		$LastYearYeartodate			= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$LastYearYeartodateStart?> 00:00:00'));				  	 			       		$('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$LastYearYeartodateEnd?> 23:59:59'));";
		// All
		if($Start != null ){
		$AllStart 					= date('Y-m-d h:i:s' ,strtotime($sd));
		$AllEnd 					= date('Y-m-d',strtotime($EndDate));
		$All						= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('$sd'));				  	 			       				   							  $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$AllEnd?> 23:59:59'));";
		}else{
		$AllStart 					= date('Y-m-d',strtotime('01-01-2000'));
		$AllEnd 					= date('Y-m-d',strtotime($EndDate));
		$All						= "$('#calendar_From').jqxDateTimeInput('setDate',new Date('<?=$AllStart?> 00:00:00'));				  	 			       				 	  $('#calendar_To').jqxDateTimeInput('setDate',new Date('<?=$AllEnd?> 23:59:59'));";
		}
// $re= $rep;

// $pageSetup =  $this->db->query("select * from config_report where \"Consolidate\" = 1 order by \"ConsolidateSort\"")->result();
			
		// document.getElementById("demo").innerHTML = $("#report").text();
// select * from config_report where \"Consolidate\" = 1 order by \"ConsolidateSort\"
        $text = "
 				var sel = $('#report').text();
        		var StatusData = [
                { ID: 1, Status: 'Today'},
				{ ID: 2, Status: 'Yesterday' },
				{ ID: 3, Status: 'This Year Week-to-date' },
				{ ID: 4, Status: 'Last Week' },
				{ ID: 17, Status: 'Current Pay Period'},
				{ ID: 18, Status: 'Last Pay Period'},
				{ ID: 5, Status: 'Week Before Last' },
				{ ID: 6, Status: 'This Year Month-to-date' },
				{ ID: 7, Status: 'Last Month' },
				{ ID: 8, Status: 'Last 30 Days' },
				{ ID: 9, Status: 'Last 60 Days' },
				{ ID: 10, Status: 'Last 90 Days' },
				{ ID: 11, Status: 'This Year Year-to-date' },
				{ ID: 12, Status: 'Last Year Today' },
				{ ID: 13, Status: 'Last Year Week-to-date' },
				{ ID: 14, Status: 'Last Year Month-to-date' },
				{ ID: 15, Status: 'Last Year Year-to-date' },
				{ ID: 16, Status: 'All' },
            ];
 			
		var source = {
			localdata: StatusData,
			datatype: 'array',
			datafields: [
				{ name: 'ID' },
				{ name: 'Status' }
			]
		};
			
		var dataAdapter = new $.jqx.dataAdapter(source);

		//Create a jqxDropDownList
		$('#dateRange').jqxDropDownList(
		{
			theme			: 'energy-blue', 
			height			: '30px',  
			width			: '220px', 
			source			: dataAdapter,
			valueMember		: 'ID', 
			displayMember	: 'Status'
		});
		$('#dateRange').jqxDropDownList('selectItem',{$cc}); 

		$('#dateRange').bind('select', function(event)
		{

			$.ajax(
			{
				
			
				success: function(data)
				{
					$('body').unblock();
							var range = $('#dateRange').text();

							// sets date for Today
							if(range == 'Today')
							{
								if({$t_sel} == 1){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}
								{$today}
									if($('#report').val()==1){ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
										if($('#report').val()=='backoffice/reports/Customer_sale_by_zip'){ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

											if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}

									if(report == 'Noreport'){
										get_details();
									}

										if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}
									


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
												eval(newstr3 + '();');
											});
										}

							}

							// sets date for Yesteday
							if(range == 'Yesterday')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
							}if({$t_sel} == 0){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

							}
								{$yesterday}
								if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}

									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}
										

										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;
												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');

											});
										}


							}
							//sets  This Year Week-to-date
							if(range == 'This Year Week-to-date')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$Weektodate}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}
											if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}

									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


									if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}


							}
							// sets Last Week date
							if(range == 'Last Week')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$lastweek}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}

							}
							// sets Week Before Last date
							if(range == 'Week Before Last')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$WeekBeforeLast}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}

							}
							// sets This Year Month-to-date
							if(range == 'This Year Month-to-date')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$ThisYearMonthtodate}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}

							}
							// sets Last Month date
							if(range == 'Last Month')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$LastMonth}
								if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}
										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}
							}
							// sets Last 30 days date
							if(range == 'Last 30 Days')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$Last30Days}
								if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											
											});
										}

							}
							// sets Last 60 days date
							if(range == 'Last 60 Days')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$Last60Days}
								if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}



										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}
							}
							// sets Last 90 days date
							if(range == 'Last 90 Days')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$Last90Days}
								if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
								if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}
										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}



										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											
											});
										}

							}
							// sets This Year Year-to-date
							if(range == 'This Year Year-to-date')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$ThisYearYeartodate}
								if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
								if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}



										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');

											});
										}


							}
							// sets Last Year Today
							if(range == 'Last Year Today')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$LastYearToday}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}
										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}

							}
							// sets Last Year Week-to-date
							if(range == 'Last Year Week-to-date')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$LastYearWeektodate}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}
							}
							// sets Last Year Month-to-date
							if(range == 'Last Year Month-to-date')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$LastYearMonthtodate}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}


										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;
										

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}
										
							}
							// sets Last Year Year-to-date
							if(range == 'Last Year Year-to-date')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$LastYearYeartodate}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}

										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}

										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
									if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}

										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{
												str = value.Path;

												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
											});
										}

							}
							// Calculate date from 1/1/2000 at 12 AM from today
							if(range == 'All')
							{
								if({$t_sel} == 1){
								$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});

								}
								{$All}
									if($('#report').val()==1)
									{ 
										one();
									}if($('#report').val()==2){
										two();
									}if($('#report').val()==3){
										three();
									}if($('#report').val()==4){
										four();
									}if($('#report').val()==5){
										five();
									}
									if($('#report').val()=='backoffice/reports/Customer_sale_by_zip')
										{ 
											get_costomersale_byzip();
										}if($('#report').val()=='backoffice/reports/Customer_sale_by_custom1'){
											get_customersale_bycustom1();
										}if($('#report').val()=='backoffice/reports/customer_sales_bycity'){
											get_customersale_bycity();
										}if($('#report').val()=='backoffice/reports/customer_sales_bystate'){
											get_customersale_bystate();
										}
										
										if($('#report').val()=='backoffice/reports/creditcardbatch')
										{ 
											get_details();
										}
										if($('#report').val()=='backoffice/reports/creditcarddetail')
										{
											get_summary_details();
										}
										
										if($('#report').val() == 'backoffice/reports/customer_rewards_summary')
											{ 
											get_summary();
											return true;
											}
											else if($('#report').val() == 'backoffice/reports/customer_rewards_detail')
											{
											get_reward_details();
											return true;

											}
										if(report == 'Noreport'){
										get_details();
									}
									if($('#report').val()=='backoffice/reports/subcategorysales')
										{ 
											subcategory_select();
										}
										if($('#report').val()=='backoffice/reports/categorysales')
										{
											category_select();
										}
									}

										if(report == 'Consolidated'){
											var btype = type;
											$.each(btype, function (index, value)
											{

												str = value.Path;
												var newstr = str.replace(/backoffice/i, '');
												var newstr1 = newstr.replace(/reports/i, '');
												var newstr3  = newstr1.replace(/\//g, '');
												eval(newstr3 + '();');

											});
										}

							if(range == 'Current Pay Period' || range == 'Last Pay Period'){

								var postdata ='option=' + range
								$.ajax({
									url: '{$base_url}backoffice/timesheet/pay-period',
									method: 'post',
									data: postdata,
									dataType: 'json',
									success: function(data){
										 $('#calendar_From').val(data.PayPeriod.StartDate);
										 $('#calendar_To').val(data.PayPeriod.EndDate);
										//$('#calendar_From').val('2018-12-26');
										//$('#calendar_To').val('2019-01-10');
									}
								})

								if({$t_sel} == 1){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: true, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: true, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}if({$t_sel} == 0){
									$('#calendar_From').jqxDateTimeInput({showTimeButton: false, showFooter:true,width: '190px', height: '30px', theme:'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
									$('#calendar_To').jqxDateTimeInput({showTimeButton: false, showFooter:true, width: '190px', height: '30px', theme: 'energyblue', formatString: 'yyyy-MM-dd hh:mm tt'});
								}
							}


				},
				error: function(){
					alert('error1');
					$('body').unblock();
				}
			});	
		});			
            ";
        return $text;
    }
}

?>