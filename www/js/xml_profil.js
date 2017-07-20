$(document).ready(function(){
	var idNow="";
	var judul=new Array();
	var deskripsi=new Array();
	var id=new Array();
	var img = new Array();
	var peta = new Array();
	var consnew;


	$.ajax({
        dataType: "GET",
        url		: "sitespasartradisional.xml",
        dataType: "xml",
        success	:
        function (xml) {

        	var i=0;
		    $(xml).find("pasar").each(function () {
				judul[i]=$(this).find('nama').text();
				peta[i]=$(this).find('map').text();
				deskripsi[i]=$(this).children().children().text();
				id[i]=$(this).attr('id');
				img[0] = 'tradisional1.jpg';
				img[1] = 'tradisional2.jpg';
				img[2] = 'tradisional3.jpg';
				img[3] = 'tradisional4.jpg';
				img[4] = 'tradisional5.jpg';

				
					var cons=
							'<div class="row" id="margins">'
							+'<div class="small-12 columns">'
							+'<span class="clickdetail"> '+judul[i]+' </span>'
							+'<hr>'
							+'<span class="id" style="display:none">'+id[i]+"</span>"	
							+'</p>'
							+'</div>'
							+'</div>'
				
			    $('#wrap').append(cons);
				i++;
				$(".kembali").fadeIn();
		    });


		}
    });

	$(document).delegate('.clickdetail','click',function(){
		$liswel=$(this).parent();
		$liswelID=$liswel.find("span.id").text();

		idNow=$liswelID;

		$.ajax({
	        dataType: "GET",
	        url		: "sitespasartradisional.xml",
	        dataType: "xml",
	        success	:
	        function (xml) {
	        	var judul=new Array();
	        	var deskripsi=new Array();
	        	var i=0;

	        	$("#wrapnew").empty();
	        	
			    $(xml).find("pasar").each(function () {
					id[i]=$(this).attr('id');

					if(id[i]==idNow){
						judul[i]=$(this).find('nama').text();
						deskripsi[i]=$(this).children().children().text();

						if(judul[i]!=""){
							consnew=
								'<div class="row" id="margins">'
									+'<div class="small-4 columns">'
										+'<img src="img/'+img[i]+'" class="img-circle">'
									+'</div>'
									+'<div class="small-8 columns" style="text-align:left">'
										+'<h3 class="title">'+judul[i]+'</h3>'
									+'</div>'
								+'</div>'
								+'<div class="row" id="margins">'
									+'<div class="small-12 columns"></div>'
										+'<div class="peta"></div>'
									+'</div>'	
								+'</div>'
								+'<div class="row" id="margins">'
									+'<div class="small-12 columns"></div>'
										+'<div id="sidee"> <p class="content"> '+deskripsi[i]+'</p> </div>'
									+'</div>'
								+'</div>'
								+'<div class="row" id="margins">'
									+'<div class="small-12 columns"></div>'
									+"<label class='lok small button expand' >Dapatkan Lokasi</label>"
									+"<label class='loki small button alert expand' >Tutup Lokasi</label>"
									+"<input type='hidden' class='isi ' value = '"+peta[i]+"'>"
									+"<div id='peta'></div>"
								+'</div>'
								+'<span class="id" style="display:none">'+id[i]+"</span>";
						}
					}
					i++;
			    });

				console.log(consnew);

				$('#wrapnew').append(consnew);
				$("#peta").hide();
				$(".loki").hide();
				$("#swift").fadeOut();
				$("#swiftdetail").fadeIn();
				$(".kembali").fadeIn();
			}
	    });
	});

	$(document).delegate('.kembali','click',function(){
			$(this).hide();
			$("#swift").fadeIn();
			$("#swiftdetail").fadeOut();
	});
	$(document).delegate('.lok','click',function(){
		$a= $(this).parent();
        $isi=$a.find('.isi').val();
        $("#peta").fadeIn();
        $(".loki").fadeIn();
        
        myMap($isi);

		//console.log($isi);
		//alert('asdas');
	});
	$(document).delegate('.loki','click',function(){
		
        $("#peta").fadeOut();
        

		//console.log($isi);
		//alert('asdas');
	});

});
