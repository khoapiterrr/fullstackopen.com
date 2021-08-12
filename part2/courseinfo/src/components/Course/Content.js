import Part from './Part';
const Content = ({ parts }) => (
  <>
    {parts.map((item, key) => (
      <Part name={item.name} exercises={item.exercises} />
    ))}
  </>
);

export default Content;
