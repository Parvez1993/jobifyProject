import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loading from "../../components/Loading";
import StatsContainer from "../../components/StatsContainer";
import ChartsContainer from "../../components/ChartsContainer";
const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications !== [] ? <ChartsContainer /> : ""}
    </>
  );
};

export default Stats;
