import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Comment } from "@/data/mockVistorias";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diário da Vistoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Adicionar um novo comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={!newComment.trim()}>
            Adicionar Comentário
          </Button>
        </div>
        <div className="mt-6 space-y-6">
          {comments.slice().reverse().map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user}`} />
                <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{comment.user}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};