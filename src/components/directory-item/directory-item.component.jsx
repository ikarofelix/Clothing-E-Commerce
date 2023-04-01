import { DirectoryItemContainer, Body, BackgroundImage } from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  const { id, title, imageUrl, route } = category;
  return (
    <DirectoryItemContainer onClick={onNavigateHandler} key={id}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
