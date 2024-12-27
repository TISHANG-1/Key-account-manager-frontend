import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: transform 0.2s;
  margin-top: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 8px;
  color: #333;
`;

export const Info = styled.p`
  margin: 4px 0;
  font-size: 0.9em;
  color: #555;

  strong {
    color: #000;
  }
`;
