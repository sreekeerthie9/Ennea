import { styled } from "styled-components";

const ErrorBlockStyling = styled.div`
  background-color: #f0d9e5;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 4px;
  color: #890b35;
  display: flex;
  gap: 2rem;
  align-items: center;
  text-align: left;

  & .error-block-icon {
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    color: #fff;
    background-color: #890b35;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .error-block h2 {
    color: inherit;
    font-size: 1.25rem;
    margin: 0;
  }

  & .error-block p {
    margin: 0;
  }
`;
export default function ErrorBlock({ title, message }) {
  return (
    <ErrorBlockStyling>
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </ErrorBlockStyling>
  );
}
