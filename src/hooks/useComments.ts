import { useAuth } from "@/contexts/auth-context/AuthContext";
import React from "react";

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
const useComments = () => {
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
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return (await response.json()) as CT;
    } catch (error) {
      console.log("error", error);
    }
  };

  // Get all Comment
  React.useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comments`
        );
        const data = await response.json();
        setComments(data.data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getAllComments();
  }, []);

  // Get product comments
  const getProductComment = async (productId: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/comments/productcomment/${productId}`
    );
    const { data } = await response.json();
    return data;
  };

  // Get all Comment By User
  React.useEffect(() => {
    const getAllCommentsByUserEmail = async () => {
      try {
        const email = user?.email;
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comments/usercomment/${email}`
        );
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
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return (await response.json()) as CT;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addComment,
    comments,
    setComments,
    commentsForUser,
    setCommentsForUser,
    getProductComment,
    deleteComment,
  };
};

export default useComments;
