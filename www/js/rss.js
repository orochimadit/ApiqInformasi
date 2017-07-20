//edit
//judul blog

var TITLE="apiqquantum.com";
//rss url 
var RSS = "http://apiqquantum.com/feed";

//stores entries
var entries = [];
var selectedEntry="";
//listen for detail links
$(".contentLink").live("click",function(){
    selectedEntry=$(this).data("entryid");
});
function readerEntries(entries){
    var s = '';
    $.each(entries,function(i,v){
        s+='<li><a href="#contentPage" class="contentLink" data-entry="'+i+'">' +v.title+'</a></li>';
		
    });
	$("#linksList").html(s);
	$("#linksList").listview("refresh");
}
//listen for main page
$("#mainPage").live("pageinit",function(){
	//set the title
	$("h1",this).text(TITLE);
	
	$.ajax({
		url:RSS,success:function(res,code){
		entries=[];
		var xml = $(res);
		var items = xml.find("item");
		$.each(items,function(i,v){
			entry= {
				title:$(v).find("title").text(),
				link:$(v).find("link").text(),
				description:$.trim($(v).find("description").text())
			};
			entries.push(entry);
		});
		//store entries
		localStorage["entries"] = JSON.stringify(entries);
		renderEntries(entries);
		}
		error:function(jqXHR,status,error){
			//mencoba untuk menggunakan cache
			if(localStorage["entries"]){
				$status.html("using cached Version .. ");
				entries = JSON.parse(localStorage[entries])readerEntries(entries);
				
			}else{
				$("#status").html("sorry,we are unable to get the rss and there is no cache");
				
			}
		}
	});
});
$("mainPage").live("pagebeforeshow",function(event,data){
	if(data.prevPage.length){
		$("h1",data.prevPage).text("");
		$("#entryText",data.prevPage).html("");
	};
});
//listen for the content page to load
$("#contentPage").live("pageshow",function(prepage){
//set the title
 $("h1",this).text(entries[selectedEntry].title);
 var contentHTML = "";
 contentHTML += entries[selectedEntry].description;
 contentHTML += '<p/><a href="'+entries[selectedEntry].link+'">Selengkapnya</a>';
 $("#entryText",this).html(contentHTML);
});