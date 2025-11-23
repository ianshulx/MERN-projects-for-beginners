import { Image, Send, X } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMessageStore } from "../store/MessageStore";

const MessageInput = () => {
  const { sendMessage } = useMessageStore();
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview
  const [text, setText] = useState("");
  const fileInputRef = useRef(null); // Reference to the hidden file input
  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        setImagePreview(reader.result);
      };
    } else {
      toast.error("Please select an image file");
    }
  };
  // Function to remove the selected image
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!text.trim() && !imagePreview) return;
      sendMessage({ text, image: imagePreview });
      setText("");
      removeImage();
    } catch (error) {
      console.log("error while sending message", error);
      toast.error("somthing error");
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
              onClick={removeImage}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Type a message..."
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
