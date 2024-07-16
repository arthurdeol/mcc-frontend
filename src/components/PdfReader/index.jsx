import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Container } from "./styles";

function PdfReader({ fileLink }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Container>
      <Document file={fileLink} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
      <p className="page-number">
        Page {pageNumber} of {numPages}
      </p>
    </Container>
  );
}

export default PdfReader;
