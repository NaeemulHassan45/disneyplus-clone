import styled from "styled-components";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUserName,
  setSignOutState,
  setUserLoginDetails,
} from "../../features/user/userSlice";
import { useEffect } from "react";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const username = useSelector(selectUserName);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history("/home");
      }
    });
  }, [username]);

  const handleAuth = () => {
    if (!username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result.user);
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (username) {
      auth.signOut().then(() => {
        dispatch(setSignOutState());
        history("/");
      });
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="LOGO" />
      </Logo>

      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img alt="HOME" src="/images/home-icon.svg" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img alt="SEARCH" src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img alt="WATCHLIST" src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a href="/originals">
              <img alt="ORIGINALS" src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img alt="MOVIES" src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img alt="SERIES" src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserName>
              <span>{username}</span>
            </UserName>
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-left: 25px;
  margin-right: auto;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: " ";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease-out 0s;
  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;
    color: #000;
  }
`;

const UserName = styled.p`
  letter-spacing: 3px;

  span {
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(159, 159, 159, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 120px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${UserName} {
    span {
      cursor: pointer;
    }
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
      cursor: pointer;
    }
  }
`;

export default Header;