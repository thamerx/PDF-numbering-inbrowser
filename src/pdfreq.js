    const {
      degrees,
      PDFDocument,
      rgb,
      StandardFonts
    } = PDFLib
		

		
    async function modifyPdf(fileDropped, filenameplz) {


		const fontPath = './fonts/Cairo-Black.ttf'
	    //const fontPath = 'https://raw.githack.com/thamerx/PDF-numbering-inbrowser/master/fonts/Cairo-Black.ttf'

		

      const fontBytes = await fetch(fontPath, {credentials: 'same-origin'}).then(res => res.arrayBuffer())

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.load(fileDropped)

      // Register the `fontkit` instance
      pdfDoc.registerFontkit(fontkit)

      // Embed our custom font in the document
      const customFont = await pdfDoc.embedFont(fontBytes)


	  
	   const pages = pdfDoc.getPages()
	   
	   var verticalAlignment = document.querySelector('input[name="verticalAlignment"]:checked').value;
	   var horizontalAlignment = document.querySelector('input[name="horizontalAlignment"]:checked').value;
	   var fontSizeDetect = document.getElementById("fontSize").value;
	   var colorOfText = document.getElementById("textColor").value;
	   
	   //-------------
	   function hexToRGB(h,isPct) {
		  let r = 0, g = 0, b = 0;
		  isPct = isPct === true;

		  if (h.length == 4) {
			r = "0x" + h[1] + h[1];
			g = "0x" + h[2] + h[2];
			b = "0x" + h[3] + h[3];
			
		  } else if (h.length == 7) {
			r = "0x" + h[1] + h[2];
			g = "0x" + h[3] + h[4];
			b = "0x" + h[5] + h[6];
		  }
			
		  if (isPct) {
			r = +(r / 255 ).toFixed(1);
			g = +(g / 255 ).toFixed(1);
			b = +(b / 255 ).toFixed(1);
		  }
		  
		  //return "rgb(" + (isPct ? r + "%," + g + "%," + b + "%" : +r + "," + +g + "," + +b) + ")";
		  //console.log(r)
		  return rgb(r, g, b);
}			
	   //------------



	  // -----------
	  	for (i = 0; i < pages.length; i++) 
		{
				var pagei = pages[i]
		  
				var { width, height } = pagei.getSize()
				
				var pagenum = (i+1).toString() + "/" +pages.length.toString()
				
					//----get text size
					
						  var text = pagenum
						  var textSize = parseInt(fontSizeDetect)
						  var textWidth = customFont.widthOfTextAtSize(text, textSize)
						  var textHeight = customFont.heightAtSize(textSize)
					
					//----
					
					//----get the text alignment
						   var xPosition = 0
						   var yPosition = 0 
						   
						   switch(horizontalAlignment) 
						   {
							  case "left":
								// code block
								xPosition = 10
								break;
							  case "center":
								// code block
								xPosition = width/2 -(textWidth/2)
								break;
							  case "right":
								// code block
								xPosition = width-10 -(textWidth)
								break;
							  default:
								xPosition = width/2 -(textWidth/2)

							}
							
						   switch(verticalAlignment) 
						   {
							  case "top":
								// code block
								yPosition = height-3-(textHeight/2)
								break;
							  case "middle":
								// code block
								yPosition = (height/2)-(textHeight/4)
								break;
							  case "bottom":
								// code block
								yPosition = 3
								break;
							  default:
								yPosition = 3

							}
					//-----
				
				
			   pagei.drawText(pagenum, {
				x: xPosition,
				y: yPosition,
				size: textSize,
				font: customFont,
				color: hexToRGB(colorOfText,true),
				rotate: degrees(0),
						})
		
		}
	  //------------

      // Draw a box around the string of text
     /* page.drawRectangle({
        x: 40,
        y: 450,
        width: textWidth,
        height: textHeight,
        borderColor: rgb(1, 0, 0),
        borderWidth: 1.5,
      })
*/
      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
		download(pdfBytes,filenameplz.replace(/\.[^/.]+$/,"")+"-numbered.pdf","application/pdf");
		
		//window.alert("Page numbers have been added to ." + filenameplz.replace(/\.[^/.]+$/,"")+"-numbered.pdf");
    }
	


