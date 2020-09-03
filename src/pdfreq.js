    const {
      degrees,
      PDFDocument,
      rgb,
      StandardFonts
    } = PDFLib

    async function modifyPdf(fileDropped, filenameplz) {

		const pdfDoc = await PDFDocument.load(fileDropped)


      // Embed the Helvetica font
      const CourierBold = await pdfDoc.embedFont(StandardFonts.CourierBold)

      // Get the first page of the document
      const pages = pdfDoc.getPages()

		for (i = 0; i < pages.length; i++) {
		  var pagei = pages[i]
		  
		var { width, height } = pagei.getSize()
		
		var pagenum = (i+1).toString() + "/" +pages.length.toString()
		
	   pagei.drawText(pagenum, {
        x: width/2 -38,
        y: 3,
        size: 20,
        font: CourierBold,
        color: rgb(0.518, 0.267, 0.427),
        rotate: degrees(0),
				})
		
		}


      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()
	  
	  //window.alert(filenameplz.replace(/\.[^/.]+$/, "") + "-numbered.pdf");

      // Trigger the browser to download the PDF document
      download(pdfBytes, filenameplz.replace(/\.[^/.]+$/, "") + "-numbered.pdf", "application/pdf");
    }
	


