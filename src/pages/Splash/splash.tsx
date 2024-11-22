import styled from "styled-components";
import NextonLogo from "@/assets/image/SplashLogo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tele = (window as any).Telegram.WebApp;

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Telegram WebApp settings
    if (tele) {
      tele.ready();
      tele.expand(); // Expand the app to full screen
      tele.BackButton.hide();
    }

    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("hasSeen");

    const timer = setTimeout(() => {
      if (hasSeenOnboarding) {
        navigate("/main"); // Redirect to main if onboarding has been seen
      } else {
        localStorage.setItem("hasSeen","true");
        navigate("/onboarding1"); // Redirect to onboarding if not seen
      }
    }, 2000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashWrapper>
      <ScreenWrapper>
        <img src={NextonLogo} alt="splash logo" />
        <RightText>Blockwave Labs Inc. All rights reserved</RightText>
      </ScreenWrapper>
    </SplashWrapper>
  );
};
export default SplashScreen;

const RightText = styled.div`
  color: var(--Dark-surfaces-Dark-surfaces-4, #2e2f3a);
  text-align: center;

  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
`;

const ScreenWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  img {
    width: 139.714px;
    height: 165.29px;
    margin-bottom: 222px;
  }
`;

const SplashWrapper = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
`;
