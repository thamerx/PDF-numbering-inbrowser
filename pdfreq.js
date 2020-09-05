    const {
      degrees,
      PDFDocument,
      rgb,
      StandardFonts
    } = PDFLib
		

		
    async function modifyPdf(fileDropped, filenameplz) {

		//import fontkit from '@pdf-lib/fontkit';


		const url = 'https://raw.githack.com/thamerx/PDF-numbering-inbrowser/master/fonts/Cairo-Black.ttf'
      const fontBytes = await fetch(url).then(res => res.arrayBuffer())

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.load(fileDropped)

      // Register the `fontkit` instance
      pdfDoc.registerFontkit(fontkit)

      // Embed our custom font in the document
      const customFont = await pdfDoc.embedFont(fontBytes)


	  
	   const pages = pdfDoc.getPages()

	  // -----------
	  	for (i = 0; i < pages.length; i++) {
		  var pagei = pages[i]
		  
		var { width, height } = pagei.getSize()
		
		var pagenum = (i+1).toString() + "/" +pages.length.toString()
		
			//----get text size
			
			      var text = pagenum
				  var textSize = 20
				  var textWidth = customFont.widthOfTextAtSize(text, textSize)
				  var textHeight = customFont.heightAtSize(textSize)
			
			//----
		
		
	   pagei.drawText(pagenum, {
        x: width/2 -(textWidth/2),
        y: 3,
        size: textSize,
        font: customFont,
        color: rgb(0.518, 0.267, 0.427),
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
    }
	


