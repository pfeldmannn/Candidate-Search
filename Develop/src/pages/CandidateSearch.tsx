import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

import Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: "",
    username: "",
    avatar_url: "",
    html_url: "",
    company: "",
    location: "",
    email: "",
    bio: "",
    login: "",
  });

  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await searchGithub();
      setAllCandidates(data);
      getCandidate(data);
    };
    getUserInfo();
  }, []);

  const getCandidate = async (data: any[]) => {
    const candidate = await searchGithubUser(data[currentIndex].login); //check this
    setCurrentCandidate(candidate);
    setCurrentIndex(currentIndex + 1);
  };
  const saveCandidate = () => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("storedCandidates") || "[]"
    );
    storedCandidates.push(currentCandidate);
    localStorage.setItem("storedCandidates", JSON.stringify(storedCandidates));
    getCandidate(allCandidates);
  };
 
  return (
    <div>
      <h1>CandidateSearch</h1>
      <article>
        <img src={currentCandidate.avatar_url} alt="avatar" />
        <h2>
          User {currentCandidate.name} {currentCandidate.login}
        </h2>
        <p>Location {currentCandidate.location || "NA"}</p>
        <p>Email {currentCandidate.email || "NA"} </p>
        <a href="html_url">Github Profile: {currentCandidate.html_url}</a>
        <p>Company {currentCandidate.company || "NA"}</p>
        <p>Bio {currentCandidate.bio || "NA"}</p>
      </article>
      <button onClick={saveCandidate}>Save Candidate</button>
      <button
        onClick={() => {
          getCandidate(allCandidates);
        }}
      >
        Reject Candidate
      </button>
    </div>
  );
};

export default CandidateSearch;
