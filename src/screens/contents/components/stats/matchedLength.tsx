import React from 'react';

type Props = {
  skills: string[];
  requirements: string[];
};

export default function MatchedIndex({ skills, requirements }: Props) {
  const calculateMatches = () => {
    const matchedSkills = skills.filter(skill => requirements.includes(skill));
    const unmatchedSkills = skills.filter(skill => !requirements.includes(skill));

    return {
      matchedCount: matchedSkills.length,
      unmatchedCount: unmatchedSkills.length,
      totalCount: skills.length,
    };
  };

  const { matchedCount, unmatchedCount, totalCount } = calculateMatches();

  return (
    <>
      <span className='legend1'>
        <p>Matched with jobs: </p> <h4>{matchedCount}</h4>
      </span>
      <span className='legend2'>
        <p>No Matches with jobs:</p> <h4>{unmatchedCount}</h4>
      </span>
      <span className='legend2'>
        <p>Total:</p>  <h4>{totalCount}</h4>
      </span>
    </>
  );
}
