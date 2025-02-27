const Category = ({ title }) => {
  return (
    <div className="category">
      <div className="category-icon">
        <img></img>
      </div>
      <div className="category-title">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Category;
