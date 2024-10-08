import axiosInstance from "@/axios/axiosInstance";

export const uploadImage = async (file: File, fileType: string) => {
    const data = {
        fileType: fileType,
    }
    const res = await axiosInstance.post(`presigned-url/generate`, data);
    const uploadUrl = res.data.uploadUrl;
    const downloadUrl = res.data.downloadUrl;

    try {
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": fileType,
          },
          body: file,
        });

        if (response.ok) {
          console.log("File uploaded successfully", downloadUrl);
            return downloadUrl;

        } else {
          console.error("Failed to upload file", response);
        }
      } catch (error) {
        console.error("Error during file upload", error);
      }
}