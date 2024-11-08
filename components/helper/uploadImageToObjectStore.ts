import axios from "axios";
// import { useToast } from "@/context/ToastContext";

export const uploadImageToObjectStore = async (file: File) => {
    console.log("Uploading Image to Object Store")
    // const addToast = useToast()
    const formData = new FormData();
    formData.append("image", file);

    console.log("Uploading Image to Object Store2")

    try {
        const response = await axios("https://store.thevingame.com/upload", {
          method: "POST",
          data: formData,
        });
        if (response.status === 201) {
          const url = response.data.fileUrl;
            // addToast("Upload Successful!", "success");
            return url;
        } else {
          throw new Error(response.data.fileUrl);
        }
      } catch (error) {
    //    addToast("Upload Failed!", "error");
        return null;
      }
}