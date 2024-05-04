import ButtonShared from "@/components/Button/Button";
import { useComment } from "@/contexts/comments-context/CommentContext";
import React from "react";

const CommentForm = ({
  productId,
  serviceName,
}: {
  productId?: string;
  serviceName?: string;
}) => {
  const { addComment } = useComment();
  const [message, setMessage] = React.useState<{
    success: boolean;
    message: string | undefined;
  }>({
    success: false,
    message: "",
  });
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userComment = (e.target as HTMLFormElement).comments.value;
    const data = await addComment(userComment, productId!, serviceName!);
    if (data?.success) setMessage({ success: true, message: data?.message });
    else setMessage({ success: false, message: data?.message });
  };
  return (
    <div className="px-4 py-2 flex flex-col gap-3 ">
      <div>
        <h1 className="text-3xl font-semibold text-cBlue ">
          You may discuss your opinion...
        </h1>
      </div>
      {/* Form */}
      <div>
        <form onSubmit={submitComment} className="flex flex-col gap-3">
          <textarea
            name="comments"
            id=""
            cols={30}
            rows={10}
            // style={{ resize: "none" }}
            placeholder="Enter your opinion..."
            className="resize-none  p-4 border "
          ></textarea>
          {message.success ? (
            <p className="text-sm text-cBlue">{message.message}</p>
          ) : (
            <p className="text-sm text-cError">{message.message}</p>
          )}
          <ButtonShared type="submit" title="Enter" />
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
