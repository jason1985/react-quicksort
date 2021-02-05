const Bar = ({ height, color }) => {
  return (
    <div
      className="bar"
      style={{ backgroundColor: `${color}`, height: `${height}px` }}
    ></div>
  );
};

export default Bar;
