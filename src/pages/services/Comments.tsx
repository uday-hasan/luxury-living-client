import ButtonShared from "@/components/Button/Button";
import { useComment } from "@/contexts/comments-context/CommentContext";
import React from "react";

const Comments = ({
  productId,
  serviceName,
}: {
  productId?: string;
  serviceName?: string;
}) => {
  const { comments, addComment } = useComment();
  const [message, setMessage] = React.useState<{
    success: boolean;
    message: string | undefined;
  }>({
    success: false,
    message: "",
  });
  const commentAsProductId = comments?.filter(
    (comment) => comment?.productId === productId
  );
  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userComment = (e.target as HTMLFormElement).comments.value;
    const data = await addComment(userComment, productId!, serviceName!);
    if (data?.success) setMessage({ success: true, message: data?.message });
    else setMessage({ success: false, message: data?.message });
  };
  return (
    <div className="px-4 py-2 flex flex-col gap-3">
      {/* Comments */}
      <div className="">
        {commentAsProductId?.length ? (
          <div className="flex flex-col gap-6">
            {commentAsProductId.map((comment) => {
              const date = new Date(comment?.createdAt).toLocaleDateString();
              return (
                <div key={comment._id} className="flex flex-col border p-2">
                  <div className="flex  justify-between text-xl font-medium text-cBlue">
                    <h1>{comment?.user?.name || "Annonimus"}</h1>
                    <h1>Posted On: {date}</h1>
                  </div>
                  <p className="text-2xl font-light">
                    {/* <p className="text-2xl font-light">{comment?.comment}</p> */}
                    {comment?.comment.length > 15
                      ? comment?.comment.slice(0, 15) + "..."
                      : comment?.comment}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xl font-medium">No comments about this service.</p>
        )}
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
            placeholder="Enter your comments..."
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

export default Comments;
