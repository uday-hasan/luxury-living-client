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
  getProductComment: (productId: string) => Promise<CommentType | void>;
  deleteComment: (id: string) => Promise<CT | void>;
};

const CommentProvider = React.createContext<CommentProviderType>({
  addComment: () => Promise.resolve(),
  deleteComment: () => Promise.resolve(),
  comments: [],
  setComments: () => {},
  commentsForUser: [],
  setCommentsForUser: () => {},
  getProductComment: () => Promise.resolve(),
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
      const response = await fetch(
        "https://luxury-living-server-o99b.onrender.com/comments",
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
          `https://luxury-living-server-o99b.onrender.com/comments`
        );
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

  // Get product comments
  const getProductComment = async (productId: string) => {
    const response = await fetch(
      `https://luxury-living-server-o99b.onrender.com/comments/${productId}`
    );
    const { data } = await response.json();
    return data;
  };

  // Get all Comment By User
  // React.useEffect(() => {
  //   const getAllCommentsByUserEmail = async () => {
  //     try {
  //       const email = user?.email;
  //       const response = await fetch(
  //         `https://luxury-living-server-o99b.onrender.com/comments/${email}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${JSON.parse(
  //               localStorage.getItem("access-token")!
  //             )}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       setCommentsForUser(data.data);
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAllCommentsByUserEmail();
  // }, [user]);

  //Delete comment
  const deleteComment = async (id: string): Promise<CT | void> => {
    try {
      const response = await fetch(
        `https://luxury-living-server-o99b.onrender.com/comments/${id}`,
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

  const value = {
    addComment,
    comments,
    setComments,
    commentsForUser,
    setCommentsForUser,
    deleteComment,
    getProductComment,
  };

  return (
    <CommentProvider.Provider value={value}>
      {children}
    </CommentProvider.Provider>
  );
};

export default CommentContext;
