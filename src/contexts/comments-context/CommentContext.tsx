import React, { Dispatch, SetStateAction } from "react";
import { useAuth } from "../auth-context/AuthContext";

type CT = {
  success: boolean;
  message: string;
};

type CommentType = {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  productId: string;
  productName: string;
  comment: string;
  createdAt: Date;
};

type CommentProviderType = {
  addComment: (
    desc: string,
    serviceId: string,
    productName: string
  ) => Promise<CT | void>;
  comments: CommentType[];
  setComments: Dispatch<SetStateAction<CommentType[]>>;
  commentsForUser: CommentType[];
  setCommentsForUser: Dispatch<SetStateAction<CommentType[]>>;
  deleteComment: (id: string) => Promise<CT | void>;
};

const CommentProvider = React.createContext<CommentProviderType>({
  addComment: () => Promise.resolve(),
  deleteComment: () => Promise.resolve(),
  comments: [],
  setComments: () => {},
  commentsForUser: [],
  setCommentsForUser: () => {},
});

export const useComment = () => React.useContext(CommentProvider);

const CommentContext = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [commentsForUser, setCommentsForUser] = React.useState<CommentType[]>(
    []
  );

  //   Add new Comment
  const addComment = async (
    desc: string,
    serviceId: string,
    productName: string
  ) => {
    try {
      if (!desc || !serviceId)
        return { message: "Please write your comment", success: false };
      const data = {
        user: {
          name: user?.name,
          email: user?.email,
        },
        productId: serviceId,
        comment: desc,
        productName,
      };
      const response = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return (await response.json()) as CT;
    } catch (error) {
      console.log("error", error);
    }
  };

  // Get all Comment
  React.useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/comments`);
        const data = await response.json();
        console.log(data);
        setComments(data.data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getAllComments();
  }, []);

  // Get all Comment By User
  React.useEffect(() => {
    const getAllCommentsByUserEmail = async () => {
      try {
        const email = user?.email;
        console.log(email);
        const response = await fetch(`http://localhost:5000/comments/${email}`);
        const data = await response.json();
        setCommentsForUser(data.data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getAllCommentsByUserEmail();
  }, [user]);

  //Delete comment
  const deleteComment = async (id: string): Promise<CT | void> => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return (await response.json()) as CT;
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    addComment,
    comments,
    setComments,
    commentsForUser,
    setCommentsForUser,
    deleteComment,
  };

  return (
    <CommentProvider.Provider value={value}>
      {children}
    </CommentProvider.Provider>
  );
};

export default CommentContext;
