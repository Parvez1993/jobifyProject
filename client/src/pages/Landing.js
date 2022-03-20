import main from "../assets/images/main.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <Wrapper>
        {" "}
        <nav>
          <h3>
            Get <span>me</span> Job
          </h3>
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Get <span>Me</span> Job
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
              aperiam officiis et labore voluptas voluptate eius enim in
              adipisci. Minima omnis alias libero id accusantium.
            </p>
            <Link to="/register">
              <button className="btn btn-hero">Login/Register</button>
            </Link>
          </div>
          <img src={main} className="img main-img" alt="job hunt" />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  h3 {
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Landing;
