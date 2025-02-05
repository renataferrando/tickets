
/* eslint-disable */
interface Props {
    color?: string;
    width?: string;
    height?: string;
}

const MultiplyIcon = ({ color="#000", width="24", height="24", strokeWidth="1.5", ...r }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...r}>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M12 12 6 6m6 6 6 6m-6-6 6-6m-6 6-6 6"
      ></path>
    </svg>
  );
  
  export default MultiplyIcon;