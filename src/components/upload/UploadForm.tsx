import { useRef, useState } from "react";

type FileUpload = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export default function UploadForm() {
  const [someinfo, someinfo_set] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [files, files_set] = useState<FileUpload[]>([]);
  const [files_data, files_data_set] = useState<FileList>();

  return (
    <div className="flex flex-col gap-4 rounded bg-blue-500 p-4">
      <h1 className="text-xl">Upload Form Example</h1>

      <label>Some text info:</label>

      <input
        value={someinfo}
        className="border bg-white"
        onChange={(e) => {
          someinfo_set(e.target.value);
        }}
      />

      <label>Upload file</label>

      <button
        onClick={() => {
          if (!hiddenFileInput?.current) return;
          hiddenFileInput.current.value = "";
          hiddenFileInput.current.click();
        }}
        className={"bg-yellow-500"}
      >
        UPLOAD FILE
      </button>
      <input
        type="file"
        multiple
        ref={hiddenFileInput}
        onChange={(e) => {
          if (!e.target?.files) return;
          // const fileUploaded = e.target?.files[0];

          const files_uploaded: FileUpload[] = [];

          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            if (file)
              files_uploaded.push({
                lastModified: file.lastModified,
                lastModifiedDate: new Date(file.lastModified),
                name: file.name,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
              });
          }

          console.log(files_uploaded);
          files_set(files_uploaded);
          files_data_set(e.target.files);
        }}
        style={{ display: "none" }}
      />

      <pre>{JSON.stringify(files, null, 2)}</pre>

      <button
        onClick={() => {
          if (!files_data) return;

          console.log(files_data);

          const body = new FormData();

          body.append("sometext", someinfo);

          for (let i = 0; i < files_data.length; i++) {
            const file = files_data[i];
            if (file) body.append("uploadfile", file);
          }

          fetch(`/api/upload`, {
            method: "post",
            // headers: getHeaders(),
            body,
          })
            .then((r) => r.json())
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        SEND
      </button>
    </div>
  );
}
