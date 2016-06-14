function loadXML(xmlFile)
{
	$.ajax({
		type: "GET",
		url: xmlFile,
		dataType: "xml",
		success: function(xml)
		{
			processXML(xml);
		}
	});
}
function processXML(xml)
{		
	var $row= $('<DIV CLASS="row"></DIV>');
	$(xml).find("ITEM").each(
		function(index)
		{
				var productTitle = $(this).find("TITLE");
				var productDescription = $(this).find("DESCRIPTION");
				var image1Location = $(this).find("PHOTO_LOCATION_1");
				var image2Location = $(this).find("PHOTO_LOCATION_2");
				var image3Location = $(this).find("PHOTO_LOCATION_3");
				
				var $item = $('<DIV class="col-md-3 portfolio-item"></DIV>');
				$item.append('<A HREF="#" data-toggle="modal" data-target="#product'+index+'"><IMG class="img-responsive portfolio-pic" src="'+image1Location.text()+'" alt=""></A>'); 
				
				//Now create the modal code
				var $productmodaltarget = $('<DIV id="product'+index+'" class="modal fade" role="dialog"></DIV>');
				
				var $modalDialog = $('<DIV class="modal-dialog"></DIV>');
				$productmodaltarget.append($modalDialog);
				
				var $modalContent = $('<DIV class="modal-content"></DIV>');
				$modalDialog.append($modalContent);
				
				//Create the modal header
				var modalHeader = document.createElement('DIV');
				populateModalHeader(modalHeader, productTitle); 
				$(modalHeader).addClass("modal-header").appendTo($modalContent);
				
				var modalBody = document.createElement('DIV');
				populateModalBody(modalBody, productDescription, image1Location, image2Location, image3Location);
				$(modalBody).addClass("modal-body").appendTo($modalContent);
				
				var modalFooter = document.createElement('DIV');
				$(modalFooter).addClass("modal-footer").appendTo($modalContent);
				
				//This is the target of the link which launches the modal
				$item.append($productmodaltarget);
				
				$item.append('<H5>'+productTitle.text()+'</H5>');
				$row.append($item);	
		}
	)
	$("#eventusproducts").append($row);			
	
}

function populateModalHeader(modalHeader, title)
{
	var closeButton = $('<BUTTON type="button" class="close" data-dismiss="modal">&times;</BUTTON>');
	$(modalHeader).append(closeButton);				
	$(modalHeader).append('<H3>'+title.text()+'</H3>');
}

function populateModalBody(modalBody, description, img1, img2, img3)
{
	var modalBodyContentRow = $('<DIV class="row"></DIV>');
	//Column 1 for image
	var modalBodyContentCol1 = $('<DIV class="col-md-8"></DIV>');
	modalBodyContentCol1.append('<IMG class="img-responsive" id="mainproductimage" src="http://placehold.it/800x600" alt="">');
	modalBodyContentRow.append(modalBodyContentCol1);
	
	var modalBodyContentCol2 = $('<DIV class="col-md-4"></DIV>');
	modalBodyContentCol2.append('<P>'+description.text()+'</P>');
	modalBodyContentRow.append(modalBodyContentCol2);    
	
	$(modalBody).append(modalBodyContentRow);
	
	//Now a row for the pictures
	var modalBodyPicsRow = $('<DIV class="row modalBodyPicsRow"></DIV>');
	var modalBodyPicsCol1 = $('<DIV class="col-md-4 text-right"></DIV>');
	modalBodyPicsCol1.append(
		'<IMG class="img-responsive eventusthumbnail" src="'+img1.text()+'" alt="">');
	
	var modalBodyPicsCol2 = $('<DIV class="col-md-4 text-right"></DIV>');
	modalBodyPicsCol2.append(
		'<IMG class="img-responsive eventusthumbnail" src="'+img2.text()+'" alt="">');
	
	var modalBodyPicsCol3 = $('<DIV class="col-md-4 text-right"></DIV>');                        
	modalBodyPicsCol3.append(
		'<IMG class="img-responsive eventusthumbnail" src="'+img3.text()+'" alt="">');

	modalBodyPicsRow.append(modalBodyPicsCol1);
	modalBodyPicsRow.append(modalBodyPicsCol2);
	modalBodyPicsRow.append(modalBodyPicsCol3);
	
	$(modalBody).append(modalBodyPicsRow);
}

function changeMainPhoto(imgPath)
{
	$("#mainproductimage").attr("src", imgPath);
}