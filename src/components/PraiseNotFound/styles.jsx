import styled from "styled-components";

export const ErrorPage = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 15% 20%;

  .musical-note-error-page {
    width: 120px;
    height: 120px;
    margin-right: 50px;
  }

  .text-error-page {
    width: 85%;
    font-size: 1.5rem;
  }

  .img-praise-not-found {
    width: 100px;
    height: 100px;
    margin-right: 50px;
  }

  @media (max-width: 1024px) {
    padding: 6% 8%;
  }

  @media (max-width: 768px) {
    .musical-note-error-page {
      margin-right: 25px;
      width: 100px;
      height: 100px;
    }
    .text-error-page {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 435px) {
    .img-praise-not-found {
      margin-right: 20px;
    }
    .musical-note-error-page {
      width: 90px;
      height: 90px;
    }
    .text-error-page {
      font-size: 1rem;
    }
  }

  @media (max-width: 320px) {
    .musical-note-error-page {
      width: 80px;
      height: 80px;
    }
    .text-error-page {
      font-size: 0.9rem;
    }
  }
`;
