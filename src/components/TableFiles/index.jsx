import { Container } from "./styles";
import { LuX } from "react-icons/lu";

export default function TableFiles({ filesSelected, setFilesSelected }) {
  function deleteFile(fileIndex) {
    filesSelected.splice(fileIndex, 1);
    setFilesSelected([...filesSelected]);
  }
  return (
    <Container>
      {filesSelected.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Order</th>
              <th>File Name</th>
              <th>Image Preview</th>
            </tr>
          </thead>
          <tbody>
            {filesSelected.map((file, i) => (
              <tr key={i}>
                <td>{file.fileType}</td>
                <td>{file.order}</td>
                <td>{file.file.name}</td>
                <td>
                  <div className="x-delete-file" onClick={() => deleteFile(i)}>
                    <LuX />
                  </div>
                  <img
                    src={file.filePreview}
                    className="image-file"
                    alt={"praise"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}
