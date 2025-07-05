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
        <div className="flex items-start gap-4">
          <Avatar className="mt-1 h-9 w-9">
            <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Eng. Ana" />
            <AvatarFallback>EA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Adicionar um novo comentário na linha do tempo..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleSubmit} size="sm" disabled={!newComment.trim()}>
              Publicar
            </Button>
          </div>
        </div>

        <div className="relative mt-8 space-y-8 border-l-2 border-dashed border-gray-200 pl-8">
          {comments.slice().reverse().map((comment) => (
            <div key={comment.id} className="relative flex items-start gap-4">
              <div className="absolute -left-[42px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user}`} />
                  <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 rounded-lg border bg-gray-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{comment.user}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
                <p className="mt-2 text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="pl-2 text-sm text-gray-500">Nenhum comentário ainda.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};