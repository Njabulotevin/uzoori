import { iComment } from "@/app/models/content";
import Comment from "@/components/common/Comment";
import React from "react";

export default function Comments({ comments }: { comments: iComment[] }) {
  return (
    <div className="flex flex-col gap-2 lg:min-w-[500px]">
      {comments.map((comment) => {
        return (
          <div className="w-full lg:w-[500px]" key={comment.id}>
            <Comment
              user={comment.user}
              date={new Date(comment.createdAt * 1000)}
              message={comment.message}
            />
          </div>
        );
      })}
    </div>
  );
}
