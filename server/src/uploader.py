from fastapi import Request

async def upload_pdf(request: Request):
    pdf_document = PdfDocument(**await request.form()) 

    # Delegate file handling to the model
    await PdfDocument.save_file(pdf_document.file)

    return {"message": "PDF file uploaded successfully!"}