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
        <h1 style={{ textAlign: "center" }}>{name}</h1>
        <h2 style={{ textAlign: "center" }}> {postedTime}</h2>
      </div>
    </div>
  );
};
