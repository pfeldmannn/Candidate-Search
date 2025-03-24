import { useEffect, useState } from "react";
// import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";
// import saveCandidate from "../pages/CandidateSearch";

const SavedCandidates = () => {
  const [storedCandidates, setStoredCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("storedCandidates") || "[]"
    );
    console.log(storedCandidates);
    setStoredCandidates(storedCandidates);
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <article>
        <table>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
          </tr>
          {storedCandidates.map((candidate, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt="avatar" />
                </td>
                <td>{candidate.username || "NA"}</td>
                <td>{candidate.location || "NA"}</td>
                <td>{candidate.email || "NA"}</td>
                <td>{candidate.company || "NA"}</td>
                <td>{candidate.bio || "NA"}</td>
                <td>
                  <button
                    onClick={() => {
                      const storedCandidates = JSON.parse(
                        localStorage.getItem("storedCandidates") || "[]"
                      );
                      storedCandidates.splice(index, 1);
                      localStorage.setItem(
                        "storedCandidates",
                        JSON.stringify(storedCandidates)
                      );
                      setStoredCandidates(storedCandidates);
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </article>
    </>
  );
};

export default SavedCandidates;
