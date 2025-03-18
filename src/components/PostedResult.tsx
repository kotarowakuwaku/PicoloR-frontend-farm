interface PostedResultProps {
  postedTime: string;
  name: string;
}
export const PostedResult: React.FC<PostedResultProps> = ({
  postedTime,
  name,
}) => {
  return (
    <div>
      <div>
        <h1>{name}</h1>
        <h2>{postedTime}</h2>
      </div>
    </div>
  );
};
