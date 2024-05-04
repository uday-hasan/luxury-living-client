import ButtonShared from "@/components/Button/Button";
import HELMET from "@/components/shared/HELMET/HELMET";
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
      <HELMET title="REVIEW" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commentsForUser.map((comment) => {
              return (
                <div
                  key={comment?._id}
                  className="flex flex-col gap-4 justify-between bg-cWhite p-4 min-h-[6em]  text-xl font-medium text-cBlue "
                >
                  <h1>Service Name: {comment?.productName}</h1>
                  <h1>
                    Posted On:
                    {new Date(comment?.createdAt).toLocaleDateString()}
                  </h1>
                  <p className="text-2xl font-light">{comment?.comment}</p>
                  <div>
                    <ButtonShared
                      title="Delete"
                      onclick={() => delete_comment(comment?._id)}
                    />
                  </div>
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
