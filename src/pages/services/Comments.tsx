import { useComment } from "@/contexts/comments-context/CommentContext";

const Comments = ({ productId }: { productId?: string }) => {
  const { comments } = useComment();
  const productComments = comments?.filter(
    (comment) => comment.productId === productId
  );
  return (
    <div className="px-4 my-4">
      <h1 className="text-3xl">Review(s)</h1>
      <div>
        {!productComments?.length ? (
          <h1 className="text-3xl font-semibold">No comments... ... ...</h1>
        ) : (
          <div>
            {productComments?.map((comment) => {
              const time = new Date(comment.createdAt);
              return (
                <div key={comment._id} className="">
                  <div className="text-base font-bold flex justify-between">
                    <h1>By: {comment.user.name}</h1>
                    <h1>Posted: {time.toLocaleDateString()}</h1>
                  </div>
                  <div>
                    <h1 className="font-semibold">{comment?.comment}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {productComments?.length && (
        <hr className="border my-2 border-cBlue border-dashed" />
      )}
    </div>
  );
};

export default Comments;
