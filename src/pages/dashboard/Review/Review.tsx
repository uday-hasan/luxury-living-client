import ButtonShared from "@/components/Button/Button";
import { useComment } from "@/contexts/comments-context/CommentContext";
import React from "react";

const Review = () => {
  const { commentsForUser, setCommentsForUser, deleteComment } = useComment();
  const [msg, setMsg] = React.useState<{ success: boolean; message: string }>({
    message: "",
    success: true,
  });
  const delete_comment = async (id: string) => {
    const res = await deleteComment(id);
    if (res?.success) {
      setCommentsForUser(
        commentsForUser.filter((comment) => comment._id !== id)
      );
      setMsg({ success: true, message: res?.message });
    } else {
      setMsg({ success: false, message: res?.message! });
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">Your review(s)</h1>
      </div>
      <div>
        {msg?.success ? (
          <p className="text-sm font-semibold text-cBlue">{msg.message}</p>
        ) : (
          <p className="text-sm font-semibold text-cError">{msg.message}</p>
        )}
      </div>
      <div>
        {commentsForUser?.length ? (
          <div>
            {commentsForUser.map((comment) => {
              return (
                <div key={comment._id}>
                  <div className="flex  justify-between text-xl font-medium text-cBlue">
                    <h1>Service Name: {comment?.productName}</h1>
                    <h1>
                      Posted On:
                      {new Date(comment?.createdAt).toLocaleDateString()}
                    </h1>
                    <div>
                      <ButtonShared
                        title="Delete"
                        onclick={() => delete_comment(comment?._id)}
                      />
                    </div>
                  </div>
                  <p className="text-2xl font-light">{comment?.comment}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Review;
